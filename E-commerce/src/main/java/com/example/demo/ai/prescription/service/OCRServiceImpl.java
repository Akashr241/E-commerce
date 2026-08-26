package com.example.demo.ai.prescription.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;

@Service
public class OCRServiceImpl implements OCRService {

    private static final Logger log = LoggerFactory.getLogger(OCRServiceImpl.class);

    private static final String AI_DETECTION_URL =
            "https://api.sightengine.com/1.0/check.json";

    private final Tesseract tesseract;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final String sightengineApiUser;
    private final String sightengineApiSecret;
    private final double aiRejectThreshold;

    public OCRServiceImpl(
            @Value("${tesseract.datapath}") String tessDataPath,
            @Value("${sightengine.api-user}") String sightengineApiUser,
            @Value("${sightengine.api-secret}") String sightengineApiSecret,
            @Value("${prescription.ai-reject-threshold:0.90}") double aiRejectThreshold
    ) {
        log.info("========== OCR SERVICE INITIALIZATION ==========");
        log.info("Tesseract data path: {}", tessDataPath);
        log.info("AI-image rejection threshold: {}", aiRejectThreshold);

        this.tesseract = new Tesseract();
        this.tesseract.setDatapath(tessDataPath);
        this.tesseract.setLanguage("eng");

        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
        this.sightengineApiUser = sightengineApiUser;
        this.sightengineApiSecret = sightengineApiSecret;
        this.aiRejectThreshold = aiRejectThreshold;

        log.info("Tesseract initialized successfully.");
        log.info("Sightengine AI detection configured: {}",
                sightengineApiUser != null && !sightengineApiUser.isBlank());
        log.info("===============================================");
    }

    @Override
    public String extractText(MultipartFile file) {
        log.info("========== OCR REQUEST STARTED ==========");

        validateFile(file);

        log.info("Filename: {}", file.getOriginalFilename());
        log.info("Content type: {}", file.getContentType());
        log.info("File size: {} bytes", file.getSize());

        byte[] imageBytes;
        try {
            imageBytes = file.getBytes();
            log.debug("Uploaded image converted to byte array successfully.");
        } catch (IOException e) {
            log.error("Could not read uploaded file.", e);

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Unable to read uploaded image",
                    e
            );
        }

        // AI image detection runs before OCR.
        rejectIfAiGenerated(imageBytes, file.getOriginalFilename());

        try {
            BufferedImage image = ImageIO.read(new ByteArrayInputStream(imageBytes));

            if (image == null) {
                log.warn("ImageIO could not read the uploaded file as an image.");

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "The uploaded file is not a valid image"
                );
            }

            log.info("Image read successfully. Width: {}, Height: {}",
                    image.getWidth(), image.getHeight());

            log.info("Sending image to Tesseract OCR...");

            String extractedText;

            // A shared Tesseract instance must not process two uploads at once.
            synchronized (tesseract) {
                extractedText = tesseract.doOCR(image).trim();
            }

            log.info("Tesseract OCR completed successfully.");
            log.info("Extracted text length: {} characters", extractedText.length());
            log.info("========== OCR REQUEST COMPLETED ==========");

            return extractedText;

        } catch (IOException e) {
            log.error("Could not convert uploaded file to image.", e);

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Unable to read prescription image",
                    e
            );

        } catch (TesseractException e) {
            log.error("Tesseract OCR failed.", e);

            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "OCR could not extract text from this image",
                    e
            );
        }
    }

    private void rejectIfAiGenerated(byte[] imageBytes, String originalFilename) {
        log.info("Starting AI-generated image detection...");

        ByteArrayResource imageResource = new ByteArrayResource(imageBytes) {
            @Override
            public String getFilename() {
                return originalFilename == null
                        ? "prescription-image.jpg"
                        : originalFilename;
            }
        };

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("media", imageResource);
        body.add("models", "genai");
        body.add("api_user", sightengineApiUser);
        body.add("api_secret", sightengineApiSecret);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(
                    AI_DETECTION_URL,
                    new HttpEntity<>(body, headers),
                    String.class
            );

            if (response.getBody() == null) {
                log.error("Sightengine returned an empty response.");

                throw new ResponseStatusException(
                        HttpStatus.BAD_GATEWAY,
                        "AI image verification returned an empty response"
                );
            }

            JsonNode root = objectMapper.readTree(response.getBody());
            String providerStatus = root.path("status").asText();

            if (!"success".equals(providerStatus)) {
                log.error("Sightengine verification failed. Provider status: {}",
                        providerStatus);

                throw new ResponseStatusException(
                        HttpStatus.BAD_GATEWAY,
                        "AI image verification failed"
                );
            }

            double aiScore = root.path("type")
                    .path("ai_generated")
                    .asDouble(-1);

            if (aiScore < 0) {
                log.error("Sightengine did not return an AI confidence score.");

                throw new ResponseStatusException(
                        HttpStatus.BAD_GATEWAY,
                        "AI image verification returned no confidence score"
                );
            }

            log.info("AI-generated image confidence score: {}", aiScore);

            if (aiScore >= aiRejectThreshold) {
                log.warn("Upload rejected. AI score {} is greater than threshold {}.",
                        aiScore, aiRejectThreshold);

                throw new ResponseStatusException(
                        HttpStatus.UNPROCESSABLE_ENTITY,
                        "This prescription image appears to be AI-generated or AI-edited. "
                                + "Please upload an original prescription image."
                );
            }

            log.info("AI image detection passed. Continuing with OCR.");

        } catch (RestClientException e) {
            log.error("Could not connect to Sightengine API.", e);

            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Could not verify whether the image is AI-generated",
                    e
            );

        } catch (IOException e) {
            log.error("Could not read Sightengine API response.", e);

            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Could not read AI image verification response",
                    e
            );
        }
    }

    private void validateFile(MultipartFile file) {
        if (file == null) {
            log.warn("Upload rejected: MultipartFile is null.");

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Please upload an image file"
            );
        }

        if (file.isEmpty()) {
            log.warn("Upload rejected: file is empty.");

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Please upload a non-empty image file"
            );
        }

        String contentType = file.getContentType();

        if (contentType == null || !contentType.startsWith("image/")) {
            log.warn("Upload rejected: unsupported content type: {}", contentType);

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Only image files are allowed"
            );
        }

        log.debug("File validation completed successfully.");
    }
}