package com.example.demo.ai.prescription.service;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.TesseractException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;

import java.io.IOException;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;


@Service
public class OCRServiceImpl implements OCRService {

    private static final Logger log =
            LoggerFactory.getLogger(OCRServiceImpl.class);


    private final ITesseract tesseract;


    public OCRServiceImpl(
            ITesseract tesseract
    ) {

        this.tesseract = tesseract;
    }


    // ==========================================
    // MAIN OCR METHOD
    // ==========================================

    @Override
    public String extractText(
            MultipartFile file
    ) {

        log.info("");
        log.info("=================================================");
        log.info("              OCR REQUEST STARTED");
        log.info("=================================================");


        validateFile(file);


        BufferedImage originalImage =
                readImage(file);


        logImageInformation(
                file,
                originalImage
        );


        // ==========================================
        // CREATE IMAGE VARIANTS
        // ==========================================

        BufferedImage grayscaleImage =
                createGrayscaleImage(
                        originalImage
                );


        BufferedImage processedImage =
                preprocessImage(
                        originalImage
                );


        // ==========================================
        // COLLECT RESULTS FROM ALL VARIANTS
        // ==========================================

        List<OcrResult> allResults =
                new ArrayList<>();


        allResults.addAll(
                performAllOcr(
                        originalImage,
                        "ORIGINAL IMAGE"
                )
        );


        allResults.addAll(
                performAllOcr(
                        grayscaleImage,
                        "GRAYSCALE IMAGE"
                )
        );


        allResults.addAll(
                performAllOcr(
                        processedImage,
                        "PROCESSED IMAGE"
                )
        );


        // ==========================================
        // REMOVE EMPTY RESULTS
        // ==========================================

        allResults.removeIf(
                result ->
                        result.text == null
                                || result.text.isBlank()
        );


        if (allResults.isEmpty()) {

            throw new RuntimeException(
                    "OCR could not detect readable text"
            );
        }


        // ==========================================
        // SORT RESULTS BY QUALITY
        // ==========================================

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


        for (int i = 0;
             i < allResults.size();
             i++) {

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


        // ==========================================
        // MERGE MULTIPLE GOOD RESULTS
        // ==========================================

        String mergedText =
                mergeBestResults(
                        allResults
                );


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


        logFinalResult(
                finalResult
        );


        return finalResult.text;
    }


    // ==========================================
    // VALIDATE FILE
    // ==========================================

    private void validateFile(
            MultipartFile file
    ) {

        log.info(
                "[VALIDATION] Checking uploaded file..."
        );


        if (file == null) {

            throw new IllegalArgumentException(
                    "File cannot be null"
            );
        }


        if (file.isEmpty()) {

            throw new IllegalArgumentException(
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


        if (contentType == null ||
                !contentType.startsWith("image/")) {

            throw new IllegalArgumentException(
                    "Only image files are supported"
            );
        }


        log.info(
                "[VALIDATION SUCCESS]"
        );
    }


    // ==========================================
    // READ IMAGE
    // ==========================================

    private BufferedImage readImage(
            MultipartFile file
    ) {

        try {

            BufferedImage image =
                    ImageIO.read(
                            file.getInputStream()
                    );


            if (image == null) {

                throw new RuntimeException(
                        "Invalid or unsupported image"
                );
            }


            return image;


        } catch (IOException exception) {

            log.error(
                    "Unable to read uploaded image",
                    exception
            );


            throw new RuntimeException(
                    "Unable to read uploaded image"
            );
        }
    }


    // ==========================================
    // IMAGE INFORMATION
    // ==========================================

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


    // ==========================================
    // PERFORM ALL OCR RESULTS
    // ==========================================

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


        log.info("");
        log.info("=================================================");
        log.info(
                "STARTING OCR FOR {}",
                imageName
        );
        log.info("=================================================");


        for (int psmMode : psmModes) {

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


    // ==========================================
    // EXECUTE OCR
    // ==========================================

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


    // ==========================================
    // CREATE GRAYSCALE IMAGE
    // ==========================================

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


    // ==========================================
    // PREPROCESS IMAGE
    // ==========================================

    private BufferedImage preprocessImage(
            BufferedImage originalImage
    ) {

        log.info(
                "[PREPROCESSING] Starting..."
        );


        int scaleFactor = 2;


        int newWidth =
                originalImage.getWidth()
                        * scaleFactor;


        int newHeight =
                originalImage.getHeight()
                        * scaleFactor;


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


        for (int y = 0;
             y < newHeight;
             y++) {

            for (int x = 0;
                 x < newWidth;
                 x++) {

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
                                        + color.getGreen()
                                        + color.getBlue()
                        ) / 3;


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


    // ==========================================
    // CLEAN TEXT
    // IMPORTANT: PRESERVE LINE STRUCTURE
    // ==========================================

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


    // ==========================================
    // MERGE BEST RESULTS
    // ==========================================

    private String mergeBestResults(
            List<OcrResult> results
    ) {

        log.info("");
        log.info("=================================================");
        log.info("          MULTI-RESULT OCR MERGING");
        log.info("=================================================");


        if (results.isEmpty()) {

            return "";
        }


        /*
         * LinkedHashSet preserves insertion order.
         *
         * The best OCR result is processed first.
         * Additional unique lines from other OCR results
         * are then added.
         */

        Set<String> uniqueLines =
                new LinkedHashSet<>();


        int maxResultsToMerge =
                Math.min(
                        6,
                        results.size()
                );


        for (int i = 0;
             i < maxResultsToMerge;
             i++) {

            OcrResult result =
                    results.get(i);


            log.info(
                    "Merging Result {} | Image: {} | PSM: {} | Score: {}",
                    i + 1,
                    result.imageName,
                    result.psmMode,
                    result.score
            );


            String[] lines =
                    result.text.split(
                            "\\n"
                    );


            for (String line : lines) {

                String cleanedLine =
                        normalizeLine(
                                line
                        );


                if (shouldKeepLine(
                        cleanedLine
                )) {

                    if (!containsSimilarLine(
                            uniqueLines,
                            cleanedLine
                    )) {

                        uniqueLines.add(
                                cleanedLine
                        );


                        log.info(
                                "ADDED UNIQUE LINE: {}",
                                cleanedLine
                        );
                    }
                }
            }
        }


        /*
         * Sometimes OCR does not return line breaks.
         * In that case, add meaningful full text
         * from other results as a fallback.
         */

        if (uniqueLines.size() <= 1) {

            log.info(
                    "Few lines detected. Applying fallback text merge."
            );


            for (OcrResult result : results) {

                String normalizedText =
                        normalizeLine(
                                result.text
                        );


                if (shouldKeepLine(
                        normalizedText
                )) {

                    if (!containsSimilarLine(
                            uniqueLines,
                            normalizedText
                    )) {

                        uniqueLines.add(
                                normalizedText
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


        String finalText =
                mergedText
                        .toString()
                        .trim();


        log.info("");
        log.info("MERGED UNIQUE LINES: {}", uniqueLines.size());
        log.info("FINAL MERGED TEXT:");
        log.info("");
        log.info("{}", finalText);


        return finalText;
    }


    // ==========================================
    // NORMALIZE LINE FOR COMPARISON
    // ==========================================

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


    // ==========================================
    // SHOULD KEEP OCR LINE
    // ==========================================

    private boolean shouldKeepLine(
            String line
    ) {

        if (line == null ||
                line.isBlank()) {

            return false;
        }


        String letters =
                line.replaceAll(
                        "[^A-Za-z]",
                        ""
                );


        /*
         * Avoid adding meaningless OCR noise.
         *
         * But we should not be too strict because
         * medicine names can be short.
         */

        return letters.length() >= 3;
    }


    // ==========================================
    // DETECT SIMILAR LINES
    // ==========================================

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


            if (normalizedExisting.equals(
                    normalizedNewLine
            )) {

                return true;
            }


            /*
             * Prevent duplicate results where OCR
             * changes only a few spaces or symbols.
             */

            if (normalizedExisting.contains(
                    normalizedNewLine
            ) ||
                    normalizedNewLine.contains(
                            normalizedExisting
                    )) {

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


    // ==========================================
    // STRING SIMILARITY
    // ==========================================

    private double calculateSimilarity(
            String first,
            String second
    ) {

        if (first.isEmpty() ||
                second.isEmpty()) {

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


        return 1.0 -
                (
                        (double) distance
                                / maxLength
                );
    }


    // ==========================================
    // LEVENSHTEIN DISTANCE
    // ==========================================

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


        for (int j = 0;
             j <= second.length();
             j++) {

            previous[j] = j;
        }


        for (int i = 1;
             i <= first.length();
             i++) {

            current[0] = i;


            for (int j = 1;
                 j <= second.length();
                 j++) {

                int cost =
                        first.charAt(i - 1)
                                == second.charAt(j - 1)
                                ? 0
                                : 1;


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


    // ==========================================
    // NORMALIZE FOR COMPARISON
    // ==========================================

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


    // ==========================================
    // ANALYZE TEXT QUALITY
    // ==========================================

    private OcrQuality analyzeTextQuality(
            String text
    ) {

        OcrQuality quality =
                new OcrQuality();


        if (text == null ||
                text.isBlank()) {

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


        for (char character :
                text.toCharArray()) {

            if (Character.isLetter(character)) {

                quality.letters++;

            } else if (
                    Character.isDigit(character)
            ) {

                quality.digits++;

            } else if (
                    Character.isWhitespace(character)
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


    // ==========================================
    // ANALYZE WORD
    // ==========================================

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


        /*
         * Short medicine names should not be
         * automatically considered garbage.
         */

        if (lettersOnly.length() <= 2) {

            quality.shortWords++;

            return;
        }


        if (isSuspiciousWord(
                word,
                lettersOnly
        )) {

            quality.suspiciousWords++;

            return;
        }


        quality.meaningfulWords++;
    }


    // ==========================================
    // SUSPICIOUS WORD DETECTION
    // ==========================================

    private boolean isSuspiciousWord(
            String originalWord,
            String lettersOnly
    ) {

        int symbolCount =
                originalWord.length()
                        - lettersOnly.length();


        if (symbolCount >
                lettersOnly.length()) {

            return true;
        }


        int[] frequency =
                new int[26];


        for (char character :
                lettersOnly.toLowerCase()
                        .toCharArray()) {

            if (character >= 'a' &&
                    character <= 'z') {

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


        return highestFrequency >
                lettersOnly.length() * 0.75;
    }


    // ==========================================
    // CALCULATE RATIOS
    // ==========================================

    private void calculateRatios(
            OcrQuality quality
    ) {

        if (quality.totalCharacters > 0) {

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


        if (quality.totalWords > 0) {

            quality.meaningfulWordRatio =
                    percentage(
                            quality.meaningfulWords,
                            quality.totalWords
                    );


            quality.garbageWordRatio =
                    percentage(
                            quality.garbageWords
                                    + quality.suspiciousWords,
                            quality.totalWords
                    );
        }
    }


    // ==========================================
    // OCR SCORING
    // ==========================================

    private int calculateTextScore(
            OcrQuality quality
    ) {

        if (quality.totalCharacters == 0) {

            return -1000;
        }


        int score = 0;


        score +=
                quality.meaningfulWords * 30;


        score +=
                quality.digits * 3;


        if (quality.alphabeticRatio >= 70) {

            score += 40;

        } else if (
                quality.alphabeticRatio >= 50
        ) {

            score += 20;
        }


        if (quality.meaningfulWordRatio >= 60) {

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


        if (quality.garbageWordRatio >= 50) {

            score -= 80;

        } else if (
                quality.garbageWordRatio >= 30
        ) {

            score -= 40;
        }


        if (quality.symbolRatio >= 20) {

            score -= 50;
        }


        return score;
    }


    // ==========================================
    // LOG OCR RESULT
    // ==========================================

    private void logOcrResult(
            OcrResult result
    ) {

        log.info("");
        log.info("========== OCR QUALITY REPORT ==========");

        log.info(
                "Image: {}",
                result.imageName
        );

        log.info(
                "PSM Mode: {}",
                result.psmMode
        );

        log.info(
                "Score: {}",
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
                "OCR TEXT:"
        );

        log.info(
                "{}",
                result.text
        );

        log.info("=========================================");
    }


    // ==========================================
    // FINAL RESULT LOGGING
    // ==========================================

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

        log.info("");

        log.info(
                "{}",
                result.text
        );

        log.info("=================================================");
        log.info("OCR REQUEST COMPLETED");
        log.info("=================================================");
    }


    // ==========================================
    // PERCENTAGE HELPER
    // ==========================================

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
                                / total
                                * 10000
                )
        ) / 100.0;
    }


    // ==========================================
    // OCR RESULT
    // ==========================================

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


    // ==========================================
    // OCR QUALITY DATA
    // ==========================================

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