
package com.example.demo.ai.prescription.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.sourceforge.tess4j.ITesseract;
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

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.RenderingHints;

import java.awt.image.BufferedImage;

import java.io.ByteArrayInputStream;
import java.io.IOException;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;


@Service
public class OCRServiceImpl implements OCRService {


    // =====================================================
    // LOGGER
    // =====================================================

    private static final Logger log =
            LoggerFactory.getLogger(OCRServiceImpl.class);


    // =====================================================
    // SIGHTENGINE AI DETECTION URL
    // =====================================================

    private static final String AI_DETECTION_URL =
            "https://api.sightengine.com/1.0/check.json";


    // =====================================================
    // DEPENDENCIES
    // =====================================================

    private final ITesseract tesseract;

    private final RestTemplate restTemplate;

    private final ObjectMapper objectMapper;


    // =====================================================
    // SIGHTENGINE CONFIGURATION
    // =====================================================

    private final String sightengineApiUser;

    private final String sightengineApiSecret;

    private final double aiRejectThreshold;

    private final boolean aiDetectionEnabled;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public OCRServiceImpl(

            ITesseract tesseract,

            @Value("${sightengine.api-user:}")
            String sightengineApiUser,

            @Value("${sightengine.api-secret:}")
            String sightengineApiSecret,

            @Value("${prescription.ai-reject-threshold:0.90}")
            double aiRejectThreshold,

            @Value("${prescription.ai-detection.enabled:true}")
            boolean aiDetectionEnabled

    ) {

        this.tesseract =
                tesseract;

        this.restTemplate =
                new RestTemplate();

        this.objectMapper =
                new ObjectMapper();

        this.sightengineApiUser =
                sightengineApiUser;

        this.sightengineApiSecret =
                sightengineApiSecret;

        this.aiRejectThreshold =
                aiRejectThreshold;

        this.aiDetectionEnabled =
                aiDetectionEnabled;


        log.info("");
        log.info("=================================================");
        log.info("           ADVANCED OCR SERVICE READY");
        log.info("=================================================");

        log.info(
                "AI Detection Enabled: {}",
                aiDetectionEnabled
        );

        log.info(
                "AI Reject Threshold: {}",
                aiRejectThreshold
        );

        log.info("=================================================");
        log.info("");
    }


    // =====================================================
    // MAIN OCR METHOD
    // =====================================================

    @Override
    public String extractText(
            MultipartFile file
    ) {

        log.info("");
        log.info("=================================================");
        log.info("              OCR REQUEST STARTED");
        log.info("=================================================");


        // =================================================
        // STEP 1 - VALIDATE FILE
        // =================================================

        validateFile(
                file
        );


        // =================================================
        // STEP 2 - READ FILE BYTES
        // =================================================

        byte[] imageBytes;

        try {

            imageBytes =
                    file.getBytes();


            log.info(
                    "[STEP 2] Image bytes read successfully: {} bytes",
                    imageBytes.length
            );


        } catch (IOException exception) {

            log.error(
                    "Unable to read uploaded image",
                    exception
            );


            throw new ResponseStatusException(

                    HttpStatus.BAD_REQUEST,

                    "Unable to read uploaded image",

                    exception
            );
        }


        // =================================================
        // STEP 3 - AI GENERATED IMAGE DETECTION
        // =================================================

        if (aiDetectionEnabled) {

            log.info("");
            log.info("=================================================");
            log.info("          AI IMAGE DETECTION STARTED");
            log.info("=================================================");


            rejectIfAiGenerated(

                    imageBytes,

                    file.getOriginalFilename()
            );


            log.info(
                    "AI image verification PASSED"
            );


        } else {

            log.warn(
                    "AI image detection is DISABLED"
            );
        }


        // =================================================
        // STEP 4 - READ IMAGE
        // =================================================

        BufferedImage originalImage =
                readImageFromBytes(
                        imageBytes
                );


        // =================================================
        // STEP 5 - IMAGE INFORMATION
        // =================================================

        logImageInformation(

                file,

                originalImage
        );


        // =================================================
        // STEP 6 - CREATE IMAGE VARIANTS
        // =================================================

        BufferedImage grayscaleImage =
                createGrayscaleImage(
                        originalImage
                );


        BufferedImage processedImage =
                preprocessImage(
                        originalImage
                );


        // =================================================
        // STEP 7 - COLLECT OCR RESULTS
        // =================================================

        List<OcrResult> allResults =
                new ArrayList<>();


        // -------------------------------------------------
        // ORIGINAL IMAGE OCR
        // -------------------------------------------------

        allResults.addAll(

                performAllOcr(

                        originalImage,

                        "ORIGINAL IMAGE"
                )
        );


        // -------------------------------------------------
        // GRAYSCALE IMAGE OCR
        // -------------------------------------------------

        allResults.addAll(

                performAllOcr(

                        grayscaleImage,

                        "GRAYSCALE IMAGE"
                )
        );


        // -------------------------------------------------
        // PROCESSED IMAGE OCR
        // -------------------------------------------------

        allResults.addAll(

                performAllOcr(

                        processedImage,

                        "PROCESSED IMAGE"
                )
        );


        // =================================================
        // STEP 8 - REMOVE EMPTY RESULTS
        // =================================================

        allResults.removeIf(

                result ->

                        result.text == null

                                ||

                                result.text.isBlank()
        );


        if (allResults.isEmpty()) {

            throw new ResponseStatusException(

                    HttpStatus.UNPROCESSABLE_ENTITY,

                    "OCR could not detect readable text"
            );
        }


        // =================================================
        // STEP 9 - SORT RESULTS BY QUALITY
        // =================================================

        allResults.sort(

                Comparator

                        .comparingInt(

                                (OcrResult result) ->

                                        result.score
                        )

                        .reversed()
        );


        log.info("");
        log.info("=================================================");
        log.info("            ALL OCR RESULTS RANKED");
        log.info("=================================================");


        for (

                int i = 0;

                i < allResults.size();

                i++

        ) {

            OcrResult result =
                    allResults.get(i);


            log.info(

                    "Rank {} | Image: {} | PSM: {} | Score: {}",

                    i + 1,

                    result.imageName,

                    result.psmMode,

                    result.score
            );
        }


        // =================================================
        // STEP 10 - MERGE BEST RESULTS
        // =================================================

        String mergedText =
                mergeBestResults(
                        allResults
                );


        // =================================================
        // STEP 11 - ANALYZE FINAL QUALITY
        // =================================================

        OcrQuality finalQuality =
                analyzeTextQuality(
                        mergedText
                );


        int finalScore =
                calculateTextScore(
                        finalQuality
                );


        OcrResult finalResult =
                new OcrResult(

                        mergedText,

                        finalScore,

                        "MERGED RESULT",

                        -1,

                        finalQuality
                );


        // =================================================
        // STEP 12 - LOG FINAL RESULT
        // =================================================

        logFinalResult(
                finalResult
        );


        return finalResult.text;
    }


    // =====================================================
    // AI GENERATED IMAGE DETECTION
    // =====================================================

    private void rejectIfAiGenerated(

            byte[] imageBytes,

            String originalFilename

    ) {

        boolean userConfigured =

                sightengineApiUser != null

                        &&

                        !sightengineApiUser.isBlank();


        boolean secretConfigured =

                sightengineApiSecret != null

                        &&

                        !sightengineApiSecret.isBlank();


        if (

                !userConfigured

                        ||

                        !secretConfigured

        ) {

            log.error(
                    "Sightengine credentials are missing"
            );


            throw new ResponseStatusException(

                    HttpStatus.BAD_GATEWAY,

                    "AI image verification service is not configured"
            );
        }


        // =================================================
        // CREATE IMAGE RESOURCE
        // =================================================

        ByteArrayResource imageResource =

                new ByteArrayResource(

                        imageBytes

                ) {

                    @Override
                    public String getFilename() {

                        if (

                                originalFilename == null

                                        ||

                                        originalFilename.isBlank()

                        ) {

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


        try {

            log.info(
                    "Sending image to AI detection service..."
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


            // =============================================
            // CHECK RESPONSE
            // =============================================

            if (

                    response.getBody() == null

                            ||

                            response.getBody().isBlank()

            ) {

                throw new ResponseStatusException(

                        HttpStatus.BAD_GATEWAY,

                        "AI image verification returned an empty response"
                );
            }


            log.info(
                    "AI Detection Response: {}",
                    response.getBody()
            );


            // =============================================
            // PARSE JSON
            // =============================================

            JsonNode root =

                    objectMapper.readTree(

                            response.getBody()
                    );


            // =============================================
            // CHECK PROVIDER STATUS
            // =============================================

            String providerStatus =

                    root.path("status")

                            .asText();


            if (

                    !"success".equals(
                            providerStatus
                    )

            ) {

                log.error(
                        "AI verification failed: {}",
                        root
                );


                throw new ResponseStatusException(

                        HttpStatus.BAD_GATEWAY,

                        "AI image verification failed"
                );
            }


            // =============================================
            // GET AI SCORE
            // =============================================

            JsonNode aiNode =

                    root

                            .path("type")

                            .path("ai_generated");


            double aiScore =

                    aiNode.asDouble(
                            -1
                    );


            if (aiScore < 0) {

                log.error(
                        "AI generated score missing: {}",
                        root
                );


                throw new ResponseStatusException(

                        HttpStatus.BAD_GATEWAY,

                        "AI image verification returned no confidence score"
                );
            }


            log.info(
                    "AI Generated Score: {}",
                    aiScore
            );


            log.info(
                    "AI Reject Threshold: {}",
                    aiRejectThreshold
            );


            // =============================================
            // REJECT AI IMAGE
            // =============================================

            if (

                    aiScore >= aiRejectThreshold

            ) {

                log.warn(
                        "IMAGE REJECTED - AI Score: {}",
                        aiScore
                );


                throw new ResponseStatusException(

                        HttpStatus.UNPROCESSABLE_ENTITY,

                        "This prescription image appears to be "
                                +

                                "AI-generated or AI-edited. "

                                +

                                "Please upload an original prescription image."
                );
            }


            log.info(
                    "IMAGE PASSED AI DETECTION"
            );


        } catch (RestClientException exception) {

            log.error(

                    "Sightengine request failed",

                    exception
            );


            throw new ResponseStatusException(

                    HttpStatus.BAD_GATEWAY,

                    "Could not verify whether the prescription is AI-generated",

                    exception
            );


        } catch (IOException exception) {

            log.error(

                    "Unable to parse AI detection response",

                    exception
            );


            throw new ResponseStatusException(

                    HttpStatus.BAD_GATEWAY,

                    "Could not read AI image verification response",

                    exception
            );
        }
    }


    // =====================================================
    // FILE VALIDATION
    // =====================================================

    private void validateFile(
            MultipartFile file
    ) {

        log.info(
                "[VALIDATION] Checking uploaded file..."
        );


        if (file == null) {

            throw new ResponseStatusException(

                    HttpStatus.BAD_REQUEST,

                    "Please upload an image file"
            );
        }


        if (file.isEmpty()) {

            throw new ResponseStatusException(

                    HttpStatus.BAD_REQUEST,

                    "Uploaded file is empty"
            );
        }


        String contentType =
                file.getContentType();


        log.info(
                "[VALIDATION] File Name: {}",
                file.getOriginalFilename()
        );


        log.info(
                "[VALIDATION] Content Type: {}",
                contentType
        );


        log.info(
                "[VALIDATION] File Size: {} bytes",
                file.getSize()
        );


        if (

                contentType == null

                        ||

                        !contentType.startsWith(
                                "image/"
                        )

        ) {

            throw new ResponseStatusException(

                    HttpStatus.BAD_REQUEST,

                    "Only image files are supported"
            );
        }


        log.info(
                "[VALIDATION SUCCESS]"
        );
    }


    // =====================================================
    // READ IMAGE FROM BYTES
    // =====================================================

    private BufferedImage readImageFromBytes(

            byte[] imageBytes

    ) {

        try {

            BufferedImage image =

                    ImageIO.read(

                            new ByteArrayInputStream(

                                    imageBytes
                            )
                    );


            if (image == null) {

                throw new ResponseStatusException(

                        HttpStatus.BAD_REQUEST,

                        "Invalid or unsupported image"
                );
            }


            return image;


        } catch (IOException exception) {

            log.error(

                    "Unable to read uploaded image",

                    exception
            );


            throw new ResponseStatusException(

                    HttpStatus.BAD_REQUEST,

                    "Unable to read uploaded image",

                    exception
            );
        }
    }


    // =====================================================
    // IMAGE INFORMATION
    // =====================================================

    private void logImageInformation(

            MultipartFile file,

            BufferedImage image

    ) {

        log.info("");
        log.info("=================================================");
        log.info("[IMAGE INFORMATION]");
        log.info("=================================================");


        log.info(
                "File Name: {}",
                file.getOriginalFilename()
        );


        log.info(
                "Width: {} px",
                image.getWidth()
        );


        log.info(
                "Height: {} px",
                image.getHeight()
        );


        log.info(
                "Image Type: {}",
                image.getType()
        );


        log.info("=================================================");
    }


    // =====================================================
    // PERFORM ALL OCR MODES
    // =====================================================

    private List<OcrResult> performAllOcr(

            BufferedImage image,

            String imageName

    ) {

        int[] psmModes = {

                3,

                4,

                6,

                11,

                12
        };


        List<OcrResult> results =
                new ArrayList<>();


        for (

                int psmMode : psmModes

        ) {

            try {

                String rawText =

                        executeOcr(

                                image,

                                psmMode
                        );


                String cleanedText =

                        cleanText(

                                rawText
                        );


                OcrQuality quality =

                        analyzeTextQuality(

                                cleanedText
                        );


                int score =

                        calculateTextScore(

                                quality
                        );


                OcrResult result =

                        new OcrResult(

                                cleanedText,

                                score,

                                imageName,

                                psmMode,

                                quality
                        );


                results.add(
                        result
                );


                logOcrResult(
                        result
                );


            } catch (TesseractException exception) {

                log.error(

                        "OCR FAILED | Image: {} | PSM: {}",

                        imageName,

                        psmMode,

                        exception
                );
            }
        }


        return results;
    }


    // =====================================================
    // EXECUTE OCR
    // =====================================================

    private String executeOcr(

            BufferedImage image,

            int psmMode

    ) throws TesseractException {

        synchronized (tesseract) {

            tesseract.setPageSegMode(
                    psmMode
            );


            return tesseract.doOCR(
                    image
            );
        }
    }


    // =====================================================
    // CREATE GRAYSCALE IMAGE
    // =====================================================

    private BufferedImage createGrayscaleImage(

            BufferedImage originalImage

    ) {

        int width =
                originalImage.getWidth();


        int height =
                originalImage.getHeight();


        BufferedImage grayscaleImage =

                new BufferedImage(

                        width,

                        height,

                        BufferedImage.TYPE_BYTE_GRAY
                );


        Graphics2D graphics =

                grayscaleImage.createGraphics();


        graphics.drawImage(

                originalImage,

                0,

                0,

                null
        );


        graphics.dispose();


        return grayscaleImage;
    }


    // =====================================================
    // IMAGE PREPROCESSING
    // =====================================================

    private BufferedImage preprocessImage(

            BufferedImage originalImage

    ) {

        log.info(
                "[PREPROCESSING] Starting..."
        );


        int scaleFactor = 2;


        int newWidth =

                originalImage.getWidth()

                        *

                        scaleFactor;


        int newHeight =

                originalImage.getHeight()

                        *

                        scaleFactor;


        BufferedImage scaledImage =

                new BufferedImage(

                        newWidth,

                        newHeight,

                        BufferedImage.TYPE_INT_RGB
                );


        Graphics2D graphics =

                scaledImage.createGraphics();


        graphics.setRenderingHint(

                RenderingHints.KEY_INTERPOLATION,

                RenderingHints.VALUE_INTERPOLATION_BICUBIC
        );


        graphics.drawImage(

                originalImage,

                0,

                0,

                newWidth,

                newHeight,

                null
        );


        graphics.dispose();


        BufferedImage processedImage =

                new BufferedImage(

                        newWidth,

                        newHeight,

                        BufferedImage.TYPE_BYTE_GRAY
                );


        for (

                int y = 0;

                y < newHeight;

                y++

        ) {

            for (

                    int x = 0;

                    x < newWidth;

                    x++

            ) {

                Color color =

                        new Color(

                                scaledImage.getRGB(

                                        x,

                                        y
                                )
                        );


                int gray =

                        (

                                color.getRed()

                                        +

                                        color.getGreen()

                                        +

                                        color.getBlue()

                        )

                                /

                                3;


                int value;


                if (gray > 180) {

                    value = 255;

                } else {

                    value = 0;
                }


                Color processedColor =

                        new Color(

                                value,

                                value,

                                value
                        );


                processedImage.setRGB(

                        x,

                        y,

                        processedColor.getRGB()
                );
            }
        }


        return processedImage;
    }


    // =====================================================
    // CLEAN OCR TEXT
    // =====================================================

    private String cleanText(
            String text
    ) {

        if (text == null) {

            return "";
        }


        return text

                .replace("\r", "\n")

                .replaceAll(
                        "\\n{3,}",
                        "\n\n"
                )

                .replaceAll(
                        "[ \\t]+",
                        " "
                )

                .replaceAll(
                        " *\\n *",
                        "\n"
                )

                .trim();
    }


    // =====================================================
    // MERGE BEST OCR RESULTS
    // =====================================================

    private String mergeBestResults(

            List<OcrResult> results

    ) {

        if (results.isEmpty()) {

            return "";
        }


        Set<String> uniqueLines =
                new LinkedHashSet<>();


        int maxResultsToMerge =

                Math.min(

                        6,

                        results.size()
                );


        for (

                int i = 0;

                i < maxResultsToMerge;

                i++

        ) {

            OcrResult result =

                    results.get(i);


            String[] lines =

                    result.text.split(
                            "\\n"
                    );


            for (String line : lines) {

                String cleanedLine =

                        normalizeLine(
                                line
                        );


                if (

                        shouldKeepLine(
                                cleanedLine
                        )

                ) {

                    if (

                            !containsSimilarLine(

                                    uniqueLines,

                                    cleanedLine
                            )

                    ) {

                        uniqueLines.add(
                                cleanedLine
                        );
                    }
                }
            }
        }


        StringBuilder mergedText =
                new StringBuilder();


        for (String line : uniqueLines) {

            mergedText

                    .append(line)

                    .append("\n");
        }


        return mergedText

                .toString()

                .trim();
    }


    // =====================================================
    // NORMALIZE LINE
    // =====================================================

    private String normalizeLine(
            String text
    ) {

        if (text == null) {

            return "";
        }


        return text

                .replaceAll(
                        "\\s+",
                        " "
                )

                .trim();
    }


    // =====================================================
    // SHOULD KEEP LINE
    // =====================================================

    private boolean shouldKeepLine(
            String line
    ) {

        if (

                line == null

                        ||

                        line.isBlank()

        ) {

            return false;
        }


        String letters =

                line.replaceAll(

                        "[^A-Za-z]",

                        ""
                );


        return letters.length() >= 3;
    }


    // =====================================================
    // DETECT SIMILAR LINES
    // =====================================================

    private boolean containsSimilarLine(

            Set<String> existingLines,

            String newLine

    ) {

        String normalizedNewLine =

                normalizeForComparison(
                        newLine
                );


        for (String existingLine : existingLines) {

            String normalizedExisting =

                    normalizeForComparison(
                            existingLine
                    );


            if (

                    normalizedExisting.equals(
                            normalizedNewLine
                    )

            ) {

                return true;
            }


            if (

                    normalizedExisting.contains(
                            normalizedNewLine
                    )

                            ||

                            normalizedNewLine.contains(
                                    normalizedExisting
                            )

            ) {

                return true;
            }


            double similarity =

                    calculateSimilarity(

                            normalizedExisting,

                            normalizedNewLine
                    );


            if (similarity >= 0.85) {

                return true;
            }
        }


        return false;
    }


    // =====================================================
    // STRING SIMILARITY
    // =====================================================

    private double calculateSimilarity(

            String first,

            String second

    ) {

        if (

                first.isEmpty()

                        ||

                        second.isEmpty()

        ) {

            return 0;
        }


        int distance =

                levenshteinDistance(

                        first,

                        second
                );


        int maxLength =

                Math.max(

                        first.length(),

                        second.length()
                );


        return 1.0

                -

                (

                        (double) distance

                                /

                                maxLength
                );
    }


    // =====================================================
    // LEVENSHTEIN DISTANCE
    // =====================================================

    private int levenshteinDistance(

            String first,

            String second

    ) {

        int[] previous =

                new int[
                        second.length() + 1
                ];


        int[] current =

                new int[
                        second.length() + 1
                ];


        for (

                int j = 0;

                j <= second.length();

                j++

        ) {

            previous[j] = j;
        }


        for (

                int i = 1;

                i <= first.length();

                i++

        ) {

            current[0] = i;


            for (

                    int j = 1;

                    j <= second.length();

                    j++

            ) {

                int cost =

                        first.charAt(i - 1)

                                ==

                                second.charAt(j - 1)

                                ?

                                0

                                :

                                1;


                current[j] =

                        Math.min(

                                Math.min(

                                        current[j - 1] + 1,

                                        previous[j] + 1
                                ),

                                previous[j - 1] + cost
                        );
            }


            int[] temporary =
                    previous;


            previous =
                    current;


            current =
                    temporary;
        }


        return previous[
                second.length()
        ];
    }


    // =====================================================
    // NORMALIZE FOR COMPARISON
    // =====================================================

    private String normalizeForComparison(

            String text

    ) {

        return text

                .toLowerCase()

                .replaceAll(

                        "[^a-z0-9]",

                        ""
                )

                .trim();
    }


    // =====================================================
    // ANALYZE OCR TEXT QUALITY
    // =====================================================

    private OcrQuality analyzeTextQuality(

            String text

    ) {

        OcrQuality quality =
                new OcrQuality();


        if (

                text == null

                        ||

                        text.isBlank()

        ) {

            return quality;
        }


        quality.totalCharacters =
                text.length();


        String[] words =

                text.split(
                        "\\s+"
                );


        quality.totalWords =
                words.length;


        for (

                char character :

                text.toCharArray()

        ) {

            if (

                    Character.isLetter(
                            character
                    )

            ) {

                quality.letters++;

            } else if (

                    Character.isDigit(
                            character
                    )

            ) {

                quality.digits++;

            } else if (

                    Character.isWhitespace(
                            character
                    )

            ) {

                quality.spaces++;

            } else {

                quality.symbols++;
            }
        }


        for (String word : words) {

            analyzeWord(

                    word,

                    quality
            );
        }


        calculateRatios(
                quality
        );


        return quality;
    }


    // =====================================================
    // ANALYZE WORD
    // =====================================================

    private void analyzeWord(

            String word,

            OcrQuality quality

    ) {

        String lettersOnly =

                word.replaceAll(

                        "[^A-Za-z]",

                        ""
                );


        if (lettersOnly.isEmpty()) {

            quality.garbageWords++;

            return;
        }


        if (lettersOnly.length() <= 2) {

            quality.shortWords++;

            return;
        }


        if (

                isSuspiciousWord(

                        word,

                        lettersOnly
                )

        ) {

            quality.suspiciousWords++;

            return;
        }


        quality.meaningfulWords++;
    }


    // =====================================================
    // SUSPICIOUS WORD DETECTION
    // =====================================================

    private boolean isSuspiciousWord(

            String originalWord,

            String lettersOnly

    ) {

        int symbolCount =

                originalWord.length()

                        -

                        lettersOnly.length();


        if (

                symbolCount

                        >

                        lettersOnly.length()

        ) {

            return true;
        }


        int[] frequency =
                new int[26];


        for (

                char character :

                lettersOnly

                        .toLowerCase()

                        .toCharArray()

        ) {

            if (

                    character >= 'a'

                            &&

                            character <= 'z'

            ) {

                frequency[
                        character - 'a'
                ]++;
            }
        }


        int highestFrequency = 0;


        for (int count : frequency) {

            if (count > highestFrequency) {

                highestFrequency =
                        count;
            }
        }


        return highestFrequency

                >

                lettersOnly.length() * 0.75;
    }


    // =====================================================
    // CALCULATE RATIOS
    // =====================================================

    private void calculateRatios(
            OcrQuality quality
    ) {

        if (
                quality.totalCharacters > 0
        ) {

            quality.alphabeticRatio =

                    percentage(

                            quality.letters,

                            quality.totalCharacters
                    );


            quality.symbolRatio =

                    percentage(

                            quality.symbols,

                            quality.totalCharacters
                    );
        }


        if (
                quality.totalWords > 0
        ) {

            quality.meaningfulWordRatio =

                    percentage(

                            quality.meaningfulWords,

                            quality.totalWords
                    );


            quality.garbageWordRatio =

                    percentage(

                            quality.garbageWords

                                    +

                                    quality.suspiciousWords,

                            quality.totalWords
                    );
        }
    }


    // =====================================================
    // OCR QUALITY SCORING
    // =====================================================

    private int calculateTextScore(
            OcrQuality quality
    ) {

        if (
                quality.totalCharacters == 0
        ) {

            return -1000;
        }


        int score = 0;


        score +=
                quality.meaningfulWords * 30;


        score +=
                quality.digits * 3;


        if (
                quality.alphabeticRatio >= 70
        ) {

            score += 40;

        } else if (
                quality.alphabeticRatio >= 50
        ) {

            score += 20;
        }


        if (
                quality.meaningfulWordRatio >= 60
        ) {

            score += 60;

        } else if (
                quality.meaningfulWordRatio >= 40
        ) {

            score += 30;

        } else if (
                quality.meaningfulWordRatio >= 20
        ) {

            score += 10;
        }


        score -=
                quality.garbageWords * 25;


        score -=
                quality.suspiciousWords * 20;


        score -=
                quality.symbols * 4;


        if (
                quality.garbageWordRatio >= 50
        ) {

            score -= 80;

        } else if (
                quality.garbageWordRatio >= 30
        ) {

            score -= 40;
        }


        if (
                quality.symbolRatio >= 20
        ) {

            score -= 50;
        }


        return score;
    }


    // =====================================================
    // LOG OCR RESULT
    // =====================================================

    private void logOcrResult(
            OcrResult result
    ) {

        log.info(
                "OCR | Image: {} | PSM: {} | Score: {}",

                result.imageName,

                result.psmMode,

                result.score
        );
    }


    // =====================================================
    // FINAL RESULT LOGGING
    // =====================================================

    private void logFinalResult(
            OcrResult result
    ) {

        log.info("");
        log.info("=================================================");
        log.info("              FINAL OCR RESULT");
        log.info("=================================================");


        log.info(
                "Result Type: {}",
                result.imageName
        );


        log.info(
                "Final Score: {}",
                result.score
        );


        log.info(
                "Meaningful Words: {}",
                result.quality.meaningfulWords
        );


        log.info(
                "Garbage Words: {}",
                result.quality.garbageWords
        );


        log.info(
                "Final OCR Text:"
        );


        log.info(
                "{}",
                result.text
        );


        log.info("=================================================");
        log.info("OCR REQUEST COMPLETED");
        log.info("=================================================");
    }


    // =====================================================
    // PERCENTAGE HELPER
    // =====================================================

    private double percentage(

            int value,

            int total

    ) {

        if (total == 0) {

            return 0.0;
        }


        return Math.round(

                (

                        (double) value

                                /

                                total

                                *

                                10000
                )

        )

                /

                100.0;
    }


    // =====================================================
    // OCR RESULT DATA CLASS
    // =====================================================

    private static class OcrResult {


        private final String text;

        private final int score;

        private final String imageName;

        private final int psmMode;

        private final OcrQuality quality;


        public OcrResult(

                String text,

                int score,

                String imageName,

                int psmMode,

                OcrQuality quality

        ) {

            this.text =
                    text;

            this.score =
                    score;

            this.imageName =
                    imageName;

            this.psmMode =
                    psmMode;

            this.quality =
                    quality;
        }
    }


    // =====================================================
    // OCR QUALITY DATA CLASS
    // =====================================================

    private static class OcrQuality {


        private int totalCharacters;

        private int totalWords;

        private int letters;

        private int digits;

        private int spaces;

        private int symbols;

        private int meaningfulWords;

        private int shortWords;

        private int garbageWords;

        private int suspiciousWords;

        private double alphabeticRatio;

        private double meaningfulWordRatio;

        private double garbageWordRatio;

        private double symbolRatio;
    }
}

