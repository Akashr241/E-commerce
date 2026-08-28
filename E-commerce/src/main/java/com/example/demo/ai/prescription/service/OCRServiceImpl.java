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

    private static final Logger log =
            LoggerFactory.getLogger(OCRServiceImpl.class);


    // =====================================================
    // SIGHTENGINE URL
    // =====================================================

    private static final String AI_DETECTION_URL =
            "https://api.sightengine.com/1.0/check.json";


    private final Tesseract tesseract;

    private final RestTemplate restTemplate;

    private final ObjectMapper objectMapper;

    private final String sightengineApiUser;

    private final String sightengineApiSecret;

    private final double aiRejectThreshold;

    private final boolean aiDetectionEnabled;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public OCRServiceImpl(

            @Value("${tesseract.datapath}")
            String tessDataPath,

            @Value("${sightengine.api-user}")
            String sightengineApiUser,

            @Value("${sightengine.api-secret}")
            String sightengineApiSecret,

            @Value("${prescription.ai-reject-threshold:0.90}")
            double aiRejectThreshold,

            @Value("${prescription.ai-detection.enabled:true}")
            boolean aiDetectionEnabled

    ) {

        log.info("");
        log.info("=================================================");
        log.info("        OCR SERVICE INITIALIZATION");
        log.info("=================================================");

        log.info("Tesseract path       : {}", tessDataPath);

        log.info("Sightengine user set : {}",
                sightengineApiUser != null
                        && !sightengineApiUser.isBlank());

        log.info("Sightengine secret set: {}",
                sightengineApiSecret != null
                        && !sightengineApiSecret.isBlank());

        log.info("AI detection enabled : {}", aiDetectionEnabled);

        log.info("AI reject threshold   : {}", aiRejectThreshold);


        // =================================================
        // TESSERACT
        // =================================================

        this.tesseract = new Tesseract();

        this.tesseract.setDatapath(tessDataPath);

        this.tesseract.setLanguage("eng");


        // =================================================
        // REST CLIENT
        // =================================================

        this.restTemplate = new RestTemplate();

        this.objectMapper = new ObjectMapper();


        this.sightengineApiUser =
                sightengineApiUser;

        this.sightengineApiSecret =
                sightengineApiSecret;

        this.aiRejectThreshold =
                aiRejectThreshold;

        this.aiDetectionEnabled =
                aiDetectionEnabled;


        log.info("Tesseract initialized successfully.");

        log.info("=================================================");
        log.info("OCR SERVICE READY");
        log.info("=================================================");
        log.info("");
    }


    // =====================================================
    // MAIN OCR METHOD
    // =====================================================

    @Override
    public String extractText(MultipartFile file) {

        log.info("");
        log.info("=================================================");
        log.info("           OCR REQUEST STARTED");
        log.info("=================================================");


        // =================================================
        // STEP 1
        // =================================================

        log.info("[STEP 1] Validating uploaded file...");

        validateFile(file);

        log.info("[STEP 1] File validation SUCCESS");


        // =================================================
        // FILE INFORMATION
        // =================================================

        log.info("");
        log.info("---------- FILE INFORMATION ----------");

        log.info("Filename     : {}",
                file.getOriginalFilename());

        log.info("Content-Type : {}",
                file.getContentType());

        log.info("File size    : {} bytes",
                file.getSize());

        log.info("--------------------------------------");


        // =================================================
        // STEP 2
        // READ IMAGE
        // =================================================

        log.info("");
        log.info("[STEP 2] Reading uploaded file bytes...");

        byte[] imageBytes;

        try {

            imageBytes = file.getBytes();

            log.info(
                    "[STEP 2] Successfully read {} bytes",
                    imageBytes.length
            );

        } catch (IOException e) {

            log.error(
                    "[STEP 2] FAILED to read uploaded file",
                    e
            );

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Unable to read uploaded image",
                    e
            );
        }


        // =================================================
        // STEP 3
        // AI IMAGE DETECTION
        // =================================================

        log.info("");
        log.info("[STEP 3] AI IMAGE DETECTION");


        if (aiDetectionEnabled) {

            log.info(
                    "[STEP 3] Sightengine detection ENABLED"
            );

            rejectIfAiGenerated(
                    imageBytes,
                    file.getOriginalFilename()
            );

            log.info(
                    "[STEP 3] AI detection PASSED"
            );

        } else {

            log.warn(
                    "[STEP 3] AI detection DISABLED"
            );

            log.warn(
                    "[STEP 3] Continuing directly to OCR"
            );
        }


        // =================================================
        // STEP 4
        // IMAGEIO
        // =================================================

        log.info("");
        log.info("[STEP 4] Converting bytes to BufferedImage...");

        try {

            BufferedImage image =
                    ImageIO.read(
                            new ByteArrayInputStream(imageBytes)
                    );


            if (image == null) {

                log.error(
                        "[STEP 4] ImageIO returned NULL"
                );

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "The uploaded file is not a valid image"
                );
            }


            log.info(
                    "[STEP 4] Image successfully loaded"
            );

            log.info(
                    "Image width  : {}",
                    image.getWidth()
            );

            log.info(
                    "Image height : {}",
                    image.getHeight()
            );


            // =================================================
            // STEP 5
            // TESSERACT
            // =================================================

            log.info("");
            log.info("[STEP 5] Starting Tesseract OCR...");


            String extractedText;


            synchronized (tesseract) {

                log.info(
                        "[STEP 5] Tesseract lock acquired"
                );

                extractedText =
                        tesseract.doOCR(image);

            }


            if (extractedText == null) {

                log.error(
                        "[STEP 5] Tesseract returned NULL"
                );

                throw new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        "OCR returned empty result"
                );
            }


            extractedText =
                    extractedText.trim();


            log.info(
                    "[STEP 5] Tesseract OCR SUCCESS"
            );

            log.info(
                    "[STEP 5] Extracted text length: {}",
                    extractedText.length()
            );


            // =================================================
            // IMPORTANT DEBUG
            // =================================================

            log.info("");
            log.info("--------------- OCR TEXT ----------------");

            log.info(
                    "\n{}",
                    extractedText
            );

            log.info("------------------------------------------");


            // =================================================
            // FINISHED
            // =================================================

            log.info("");
            log.info("=================================================");
            log.info("           OCR REQUEST COMPLETED");
            log.info("=================================================");
            log.info("");


            return extractedText;


        } catch (IOException e) {

            log.error(
                    "[STEP 4] Image conversion FAILED",
                    e
            );

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Unable to read prescription image",
                    e
            );


        } catch (TesseractException e) {

            log.error(
                    "[STEP 5] Tesseract OCR FAILED",
                    e
            );

            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "OCR could not extract text from this image",
                    e
            );
        }
    }


    // =====================================================
    // SIGHTENGINE AI DETECTION
    // =====================================================

    private void rejectIfAiGenerated(
            byte[] imageBytes,
            String originalFilename) {


        log.info("");
        log.info("=================================================");
        log.info("       SIGHTENGINE AI DETECTION START");
        log.info("=================================================");


        // =================================================
        // CHECK CREDENTIALS
        // =================================================

        boolean userConfigured =
                sightengineApiUser != null
                        && !sightengineApiUser.isBlank();

        boolean secretConfigured =
                sightengineApiSecret != null
                        && !sightengineApiSecret.isBlank();


        log.info(
                "[AI-1] API User configured : {}",
                userConfigured
        );

        log.info(
                "[AI-1] API Secret configured: {}",
                secretConfigured
        );


        if (!userConfigured || !secretConfigured) {

            log.error(
                    "[AI-1] Sightengine credentials are missing!"
            );

            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Sightengine API credentials are not configured"
            );
        }


        // =================================================
        // IMAGE RESOURCE
        // =================================================

        ByteArrayResource imageResource =
                new ByteArrayResource(imageBytes) {

                    @Override
                    public String getFilename() {

                        if (originalFilename == null
                                || originalFilename.isBlank()) {

                            return "prescription-image.jpg";
                        }

                        return originalFilename;
                    }
                };


        // =================================================
        // REQUEST BODY
        // =================================================

        MultiValueMap<String, Object> body =
                new LinkedMultiValueMap<>();


        body.add(
                "media",
                imageResource
        );

        body.add(
                "models",
                "genai"
        );

        body.add(
                "api_user",
                sightengineApiUser
        );

        body.add(
                "api_secret",
                sightengineApiSecret
        );


        // =================================================
        // HEADERS
        // =================================================

        HttpHeaders headers =
                new HttpHeaders();

        headers.setContentType(
                MediaType.MULTIPART_FORM_DATA
        );


        // =================================================
        // REQUEST DEBUG
        // =================================================

        log.info("");
        log.info("---------- SIGHTENGINE REQUEST ----------");

        log.info(
                "URL              : {}",
                AI_DETECTION_URL
        );

        log.info(
                "Model            : genai"
        );

        log.info(
                "Filename         : {}",
                originalFilename
        );

        log.info(
                "Image size       : {} bytes",
                imageBytes.length
        );

        log.info(
                "Content-Type     : {}",
                headers.getContentType()
        );

        log.info(
                "API User         : {}",
                sightengineApiUser
        );

        log.info(
                "API Secret exists: {}",
                secretConfigured
        );

        log.info(
                "------------------------------------------");


        // =================================================
        // CALL API
        // =================================================

        try {

            log.info(
                    "[AI-2] Sending request to Sightengine..."
            );


            ResponseEntity<String> response =
                    restTemplate.postForEntity(

                            AI_DETECTION_URL,

                            new HttpEntity<>(
                                    body,
                                    headers
                            ),

                            String.class
                    );


            // =================================================
            // RESPONSE DEBUG
            // =================================================

            log.info("");
            log.info("---------- SIGHTENGINE RESPONSE ----------");

            log.info(
                    "HTTP STATUS : {}",
                    response.getStatusCode()
            );

            log.info(
                    "HTTP STATUS CODE : {}",
                    response.getStatusCode().value()
            );

            log.info(
                    "BODY : {}",
                    response.getBody()
            );

            log.info(
                    "HEADERS : {}",
                    response.getHeaders()
            );

            log.info(
                    "-------------------------------------------");


            // =================================================
            // EMPTY RESPONSE
            // =================================================

            if (response.getBody() == null
                    || response.getBody().isBlank()) {

                log.error(
                        "[AI-3] Sightengine returned EMPTY body"
                );

                throw new ResponseStatusException(
                        HttpStatus.BAD_GATEWAY,
                        "AI image verification returned an empty response"
                );
            }


            // =================================================
            // PARSE JSON
            // =================================================

            log.info(
                    "[AI-4] Parsing Sightengine JSON..."
            );


            JsonNode root =
                    objectMapper.readTree(
                            response.getBody()
                    );


            log.info(
                    "[AI-4] Parsed JSON successfully"
            );


            // =================================================
            // PROVIDER STATUS
            // =================================================

            String providerStatus =
                    root.path("status").asText();


            log.info(
                    "[AI-5] Provider status: {}",
                    providerStatus
            );


            if (!"success".equals(providerStatus)) {

                log.error(
                        "[AI-5] Sightengine returned non-success status"
                );

                log.error(
                        "[AI-5] Complete response: {}",
                        root
                );

                throw new ResponseStatusException(
                        HttpStatus.BAD_GATEWAY,
                        "AI image verification failed"
                );
            }


            // =================================================
            // AI SCORE
            // =================================================

            JsonNode typeNode =
                    root.path("type");


            log.info(
                    "[AI-6] type node: {}",
                    typeNode
            );


            JsonNode aiNode =
                    typeNode.path("ai_generated");


            log.info(
                    "[AI-6] ai_generated node: {}",
                    aiNode
            );


            double aiScore =
                    aiNode.asDouble(-1);


            log.info(
                    "[AI-6] AI generated score: {}",
                    aiScore
            );


            // =================================================
            // SCORE VALIDATION
            // =================================================

            if (aiScore < 0) {

                log.error(
                        "[AI-6] AI score was NOT returned"
                );

                log.error(
                        "[AI-6] Complete JSON: {}",
                        root
                );

                throw new ResponseStatusException(
                        HttpStatus.BAD_GATEWAY,
                        "AI image verification returned no confidence score"
                );
            }


            // =================================================
            // THRESHOLD
            // =================================================

            log.info(
                    "[AI-7] AI score       : {}",
                    aiScore
            );

            log.info(
                    "[AI-7] Reject threshold: {}",
                    aiRejectThreshold
            );


            if (aiScore >= aiRejectThreshold) {

                log.warn(
                        "[AI-8] IMAGE REJECTED"
                );

                log.warn(
                        "[AI-8] AI score {} >= threshold {}",
                        aiScore,
                        aiRejectThreshold
                );


                throw new ResponseStatusException(
                        HttpStatus.UNPROCESSABLE_ENTITY,

                        "This prescription image appears to be "
                                + "AI-generated or AI-edited. "
                                + "Please upload an original prescription image."
                );
            }


            // =================================================
            // PASSED
            // =================================================

            log.info(
                    "[AI-8] IMAGE PASSED AI DETECTION"
            );

            log.info(
                    "================================================="
            );

            log.info(
                    "       SIGHTENGINE AI DETECTION END"
            );

            log.info(
                    "================================================="
            );


        } catch (RestClientException e) {

            // =================================================
            // VERY IMPORTANT DEBUG
            // =================================================

            log.error("");
            log.error(
                    "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
            );

            log.error(
                    "       SIGHTENGINE REQUEST FAILED"
            );

            log.error(
                    "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
            );

            log.error(
                    "Exception class : {}",
                    e.getClass().getName()
            );

            log.error(
                    "Exception msg   : {}",
                    e.getMessage()
            );

            log.error(
                    "Cause           : {}",
                    e.getCause()
            );

            log.error(
                    "Full exception:",
                    e
            );

            log.error(
                    "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
            );


            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Could not verify whether the image is AI-generated",
                    e
            );


        } catch (IOException e) {

            log.error(
                    "[AI-9] JSON parsing failed",
                    e
            );


            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Could not read AI image verification response",
                    e
            );
        }
    }


    // =====================================================
    // FILE VALIDATION
    // =====================================================

    private void validateFile(MultipartFile file) {

        log.info(
                "[VALIDATION] Starting file validation"
        );


        if (file == null) {

            log.error(
                    "[VALIDATION] MultipartFile is NULL"
            );

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Please upload an image file"
            );
        }


        if (file.isEmpty()) {

            log.error(
                    "[VALIDATION] Uploaded file is EMPTY"
            );

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Please upload a non-empty image file"
            );
        }


        String contentType =
                file.getContentType();


        log.info(
                "[VALIDATION] Content type: {}",
                contentType
        );


        if (contentType == null
                || !contentType.startsWith("image/")) {

            log.error(
                    "[VALIDATION] Invalid content type: {}",
                    contentType
            );

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Only image files are allowed"
            );
        }


        log.info(
                "[VALIDATION] File validation SUCCESS"
        );
    }
}