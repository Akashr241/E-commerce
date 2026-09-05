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
 
 
@Service 
public class OCRServiceImpl implements OCRService { 
 
    private static final Logger log = 
            LoggerFactory.getLogger(OCRServiceImpl.class); 
 
 
    private final ITesseract tesseract; 
 
 
    // ========================================== 
    // CONSTRUCTOR 
    // ========================================== 
 
    public OCRServiceImpl(ITesseract tesseract) { 
 
        this.tesseract = tesseract; 
    } 
 
 
    // ========================================== 
    // MAIN OCR METHOD 
    // ========================================== 
 
    @Override 
    public String extractText(MultipartFile file) { 
 
        log.info(""); 
        log.info("================================================="); 
        log.info("              OCR REQUEST STARTED"); 
        log.info("================================================="); 
 
 
        // ========================================== 
        // STEP 1: VALIDATE FILE 
        // ========================================== 
 
        validateFile(file); 
 
 
        // ========================================== 
        // STEP 2: READ IMAGE 
        // ========================================== 
 
        BufferedImage originalImage = 
                readImage(file); 
 
 
        logImageInformation( 
                file, 
                originalImage 
        ); 
 
 
        // ========================================== 
        // STEP 3: CREATE IMAGE VARIANTS 
        // ========================================== 
 
        log.info(""); 
        log.info("================================================="); 
        log.info("[STEP 2] CREATING IMAGE VARIANTS"); 
        log.info("================================================="); 
 
 
        BufferedImage grayscaleImage = 
                createGrayscaleImage( 
                        originalImage 
                ); 
 
 
        BufferedImage processedImage = 
                preprocessImage( 
                        originalImage 
                ); 
 
 
        log.info( 
                "Image variants created successfully" 
        ); 
 
 
        // ========================================== 
        // STEP 4: OCR ORIGINAL IMAGE 
        // ========================================== 
 
        OcrResult originalResult = 
                performBestOcr( 
                        originalImage, 
                        "ORIGINAL IMAGE" 
                ); 
 
 
        // ========================================== 
        // STEP 5: OCR GRAYSCALE IMAGE 
        // ========================================== 
 
        OcrResult grayscaleResult = 
                performBestOcr( 
                        grayscaleImage, 
                        "GRAYSCALE IMAGE" 
                ); 
 
 
        // ========================================== 
        // STEP 6: OCR PROCESSED IMAGE 
        // ========================================== 
 
        OcrResult processedResult = 
                performBestOcr( 
                        processedImage, 
                        "PROCESSED IMAGE" 
                ); 
 
 
        // ========================================== 
        // STEP 7: SELECT FINAL RESULT 
        // ========================================== 
 
        log.info(""); 
        log.info("================================================="); 
        log.info("[STEP 6] FINAL OCR RESULT SELECTION"); 
        log.info("================================================="); 
 
 
        OcrResult finalResult = 
                selectBestResult( 
                        originalResult, 
                        grayscaleResult, 
                        processedResult 
                ); 
 
 
        // ========================================== 
        // FINAL RESULT 
        // ========================================== 
 
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
        log.info("[STEP 1] IMAGE INFORMATION"); 
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
    // PERFORM OCR WITH MULTIPLE PSM MODES 
    // ========================================== 
 
    private OcrResult performBestOcr( 
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
 
 
        OcrResult bestResult = 
                new OcrResult( 
                        "", 
                        -100000, 
                        imageName, 
                        -1, 
                        new OcrQuality() 
                ); 
 
 
        log.info(""); 
        log.info("================================================="); 
        log.info( 
                "STARTING OCR FOR {}", 
                imageName 
        ); 
        log.info("================================================="); 
 
 
        for (int psmMode : psmModes) { 
 
            log.info(""); 
            log.info("-----------------------------------------------"); 
            log.info( 
                    "{} - TESTING PSM MODE {}", 
                    imageName, 
                    psmMode 
            ); 
            log.info("-----------------------------------------------"); 
 
 
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
 
 
                logOcrResult( 
                        imageName, 
                        psmMode, 
                        rawText, 
                        cleanedText, 
                        quality, 
                        score 
                ); 
 
 
                OcrResult currentResult = 
                        new OcrResult( 
                                cleanedText, 
                                score, 
                                imageName, 
                                psmMode, 
                                quality 
                        ); 
 
 
                if (isBetterResult( 
                        currentResult, 
                        bestResult 
                )) { 
 
                    bestResult = 
                            currentResult; 
 
 
                    log.info( 
                            ">>> NEW BEST RESULT SELECTED" 
                    ); 
 
                    log.info( 
                            "Best Score: {}", 
                            bestResult.score 
                    ); 
 
                    log.info( 
                            "Best PSM: {}", 
                            bestResult.psmMode 
                    ); 
                } 
 
 
            } catch (TesseractException exception) { 
 
                log.error( 
                        "OCR FAILED | Image: {} | PSM: {}", 
                        imageName, 
                        psmMode, 
                        exception 
                ); 
            } 
        } 
 
 
        log.info(""); 
        log.info("================================================="); 
        log.info( 
                "BEST RESULT FOR {}", 
                imageName 
        ); 
        log.info("================================================="); 
 
        log.info( 
                "Best Score: {}", 
                bestResult.score 
        ); 
 
        log.info( 
                "Best PSM Mode: {}", 
                bestResult.psmMode 
        ); 
 
        log.info( 
                "Best Text Length: {}", 
                bestResult.text.length() 
        ); 
 
        log.info( 
                "Best OCR Text: {}", 
                bestResult.text 
        ); 
 
        log.info("================================================="); 
 
 
        return bestResult; 
    } 
 
 
    // ========================================== 
    // EXECUTE TESSERACT OCR 
    // ========================================== 
 
    private String executeOcr( 
            BufferedImage image, 
            int psmMode 
    ) throws TesseractException { 
 
        /* 
         * ITesseract is a shared Spring bean. 
         * 
         * setPageSegMode changes the Tesseract object, 
         * so synchronize this section to prevent one 
         * request from changing the PSM mode while 
         * another request is performing OCR. 
         */ 
 
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
                "[PREPROCESSING] Starting image preprocessing..." 
        ); 
 
 
        // ------------------------------------------ 
        // UPSCALE IMAGE 
        // ------------------------------------------ 
 
        int scaleFactor = 2; 
 
 
        int newWidth = 
                originalImage.getWidth() 
                        * scaleFactor; 
 
 
        int newHeight = 
                originalImage.getHeight() 
                        * scaleFactor; 
 
 
        log.info( 
                "[PREPROCESSING] Original Size: {} x {}", 
                originalImage.getWidth(), 
                originalImage.getHeight() 
        ); 
 
        log.info( 
                "[PREPROCESSING] Upscaled Size: {} x {}", 
                newWidth, 
                newHeight 
        ); 
 
 
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
 
 
        // ------------------------------------------ 
        // GRAYSCALE + SIMPLE THRESHOLD 
        // ------------------------------------------ 
 
        BufferedImage processedImage = 
                new BufferedImage( 
                        newWidth, 
                        newHeight, 
                        BufferedImage.TYPE_BYTE_GRAY 
                ); 
 
 
        for (int y = 0; y < newHeight; y++) { 
 
            for (int x = 0; x < newWidth; x++) { 
 
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
 
 
                /* 
                 * Keep the threshold conservative. 
                 * 
                 * Very aggressive thresholding can 
                 * destroy handwriting. 
                 */ 
 
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
 
 
        log.info( 
                "[PREPROCESSING SUCCESS]" 
        ); 
 
 
        return processedImage; 
    } 
 
 
    // ========================================== 
    // CLEAN OCR TEXT 
    // ========================================== 
 
    private String cleanText( 
            String text 
    ) { 
 
        if (text == null) { 
 
            return ""; 
        } 
 
 
        return text 
 
                .replaceAll( 
                        "[\\r\\n]+", 
                        " " 
                ) 
 
                .replaceAll( 
                        "\\s+", 
                        " " 
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
    // ANALYZE INDIVIDUAL WORD 
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
 
 
        if (lettersOnly.length() <= 2) { 
 
            quality.shortWords++; 
 
            return; 
        } 
 
 
        if (containsRepeatedCharacters( 
                lettersOnly 
        )) { 
 
            quality.suspiciousWords++; 
 
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
    // DETECT REPEATED CHARACTERS 
    // ========================================== 
 
    private boolean containsRepeatedCharacters( 
            String word 
    ) { 
 
        if (word.length() < 3) { 
 
            return false; 
        } 
 
 
        int repeatedCharacters = 0; 
 
 
        for (int i = 1; 
             i < word.length(); 
             i++) { 
 
            char current = 
                    Character.toLowerCase( 
                            word.charAt(i) 
                    ); 
 
 
            char previous = 
                    Character.toLowerCase( 
                            word.charAt(i - 1) 
                    ); 
 
 
            if (current == previous) { 
 
                repeatedCharacters++; 
            } 
        } 
 
 
        return repeatedCharacters >= 2; 
    } 
 
 
    // ========================================== 
    // DETECT SUSPICIOUS WORD 
    // ========================================== 
 
    private boolean isSuspiciousWord( 
            String originalWord, 
            String lettersOnly 
    ) { 
 
        // Too many symbols in a word 
 
        int symbolCount = 
                originalWord.length() 
                        - lettersOnly.length(); 
 
 
        if (symbolCount > lettersOnly.length()) { 
 
            return true; 
        } 
 
 
        // Single character dominates the word 
 
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
                lettersOnly.length() * 0.7; 
    } 
 
 
    // ========================================== 
    // CALCULATE QUALITY RATIOS 
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
 
 
            quality.shortWordRatio = 
                    percentage( 
                            quality.shortWords, 
                            quality.totalWords 
                    ); 
        } 
    } 
 
 
    // ========================================== 
    // IMPROVED OCR SCORING LOGIC 
    // ========================================== 
 
    private int calculateTextScore( 
            OcrQuality quality 
    ) { 
 
        if (quality.totalCharacters == 0) { 
 
            return -1000; 
        } 
 
 
        int score = 0; 
 
 
        // ========================================== 
        // POSITIVE SIGNALS 
        // ========================================== 
 
        /* 
         * Meaningful words are much more important 
         * than simply having many characters. 
         */ 
 
        score += 
                quality.meaningfulWords * 30; 
 
 
        // Digits are useful for medicine dosage 
 
        score += 
                quality.digits * 3; 
 
 
        // Good alphabetic ratio 
 
        if (quality.alphabeticRatio >= 70) { 
 
            score += 40; 
 
        } else if ( 
                quality.alphabeticRatio >= 50 
        ) { 
 
            score += 20; 
        } 
 
 
        // Meaningful word ratio 
 
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
 
 
        // ========================================== 
        // NEGATIVE SIGNALS 
        // ========================================== 
 
        // Garbage words 
 
        score -= 
                quality.garbageWords * 25; 
 
 
        // Suspicious words 
 
        score -= 
                quality.suspiciousWords * 20; 
 
 
        // Too many short words 
 
        score -= 
                quality.shortWords * 8; 
 
 
        // Symbols 
 
        score -= 
                quality.symbols * 4; 
 
 
        // High garbage ratio 
 
        if (quality.garbageWordRatio >= 50) { 
 
            score -= 80; 
 
        } else if ( 
                quality.garbageWordRatio >= 30 
        ) { 
 
            score -= 40; 
        } 
 
 
        // High symbol ratio 
 
        if (quality.symbolRatio >= 20) { 
 
            score -= 50; 
        } 
 
 
        return score; 
    } 
 
 
    // ========================================== 
    // BETTER RESULT SELECTION 
    // ========================================== 
 
    private boolean isBetterResult( 
            OcrResult current, 
            OcrResult best 
    ) { 
 
        // Never replace a non-empty result 
        // with an empty result 
 
        if (current.text.isBlank()) { 
 
            return false; 
        } 
 
 
        if (best.text.isBlank()) { 
 
            return true; 
        } 
 
 
        // Primary decision: score 
 
        if (current.score > best.score) { 
 
            return true; 
        } 
 
 
        if (current.score < best.score) { 
 
            return false; 
        } 
 
 
        /* 
         * If scores are equal, prefer the result 
         * with more meaningful words. 
         */ 
 
        if (current.quality.meaningfulWords > 
                best.quality.meaningfulWords) { 
 
            return true; 
        } 
 
 
        if (current.quality.meaningfulWords < 
                best.quality.meaningfulWords) { 
 
            return false; 
        } 
 
 
        /* 
         * If still equal, prefer less garbage. 
         */ 
 
        return current.quality.garbageWords 
                < best.quality.garbageWords; 
    } 
 
 
    // ========================================== 
    // SELECT BEST IMAGE RESULT 
    // ========================================== 
 
    private OcrResult selectBestResult( 
            OcrResult original, 
            OcrResult grayscale, 
            OcrResult processed 
    ) { 
 
        OcrResult best = 
                original; 
 
 
        if (isBetterResult( 
                grayscale, 
                best 
        )) { 
 
            best = 
                    grayscale; 
        } 
 
 
        if (isBetterResult( 
                processed, 
                best 
        )) { 
 
            best = 
                    processed; 
        } 
 
 
        log.info( 
                "Original Score: {} | Meaningful Words: {}", 
                original.score, 
                original.quality.meaningfulWords 
        ); 
 
        log.info( 
                "Grayscale Score: {} | Meaningful Words: {}", 
                grayscale.score, 
                grayscale.quality.meaningfulWords 
        ); 
 
        log.info( 
                "Processed Score: {} | Meaningful Words: {}", 
                processed.score, 
                processed.quality.meaningfulWords 
        ); 
 
        log.info( 
                "SELECTED IMAGE: {}", 
                best.imageName 
        ); 
 
 
        return best; 
    } 
 
 
    // ========================================== 
    // LOG DETAILED OCR RESULT 
    // ========================================== 
 
    private void logOcrResult( 
            String imageName, 
            int psmMode, 
            String rawText, 
            String cleanedText, 
            OcrQuality quality, 
            int score 
    ) { 
 
        log.info(""); 
        log.info("========== OCR QUALITY REPORT =========="); 
 
        log.info( 
                "Image: {}", 
                imageName 
        ); 
 
        log.info( 
                "PSM Mode: {}", 
                psmMode 
        ); 
 
        log.info( 
                "Raw Length: {}", 
                rawText != null 
                        ? rawText.length() 
                        : 0 
        ); 
 
        log.info( 
                "Cleaned Length: {}", 
                cleanedText.length() 
        ); 
 
        log.info( 
                "Total Words: {}", 
                quality.totalWords 
        ); 
 
        log.info( 
                "Meaningful Words: {}", 
                quality.meaningfulWords 
        ); 
 
        log.info( 
                "Short Words: {}", 
                quality.shortWords 
        ); 
 
        log.info( 
                "Garbage Words: {}", 
                quality.garbageWords 
        ); 
 
        log.info( 
                "Suspicious Words: {}", 
                quality.suspiciousWords 
        ); 
 
        log.info( 
                "Letters: {}", 
                quality.letters 
        ); 
 
        log.info( 
                "Digits: {}", 
                quality.digits 
        ); 
 
        log.info( 
                "Symbols: {}", 
                quality.symbols 
        ); 
 
        log.info( 
                "Alphabetic Ratio: {}%", 
                quality.alphabeticRatio 
        ); 
 
        log.info( 
                "Meaningful Word Ratio: {}%", 
                quality.meaningfulWordRatio 
        ); 
 
        log.info( 
                "Garbage Ratio: {}%", 
                quality.garbageWordRatio 
        ); 
 
        log.info( 
                "Symbol Ratio: {}%", 
                quality.symbolRatio 
        ); 
 
        log.info( 
                "FINAL QUALITY SCORE: {}", 
                score 
        ); 
 
        log.info( 
                "QUALITY LEVEL: {}", 
                getQualityLevel(score) 
        ); 
 
        log.info( 
                "OCR TEXT: {}", 
                cleanedText 
        ); 
 
        log.info("========================================="); 
    } 
 
 
    // ========================================== 
    // QUALITY LEVEL 
    // ========================================== 
 
    private String getQualityLevel( 
            int score 
    ) { 
 
        if (score >= 150) { 
 
            return "HIGH"; 
 
        } else if (score >= 50) { 
 
            return "MEDIUM"; 
 
        } else { 
 
            return "LOW"; 
        } 
    } 
 
 
    // ========================================== 
    // FINAL RESULT LOGGING 
    // ========================================== 
 
    private void logFinalResult( 
            OcrResult result 
    ) { 
 
        log.info(""); 
        log.info("================================================="); 
        log.info("                 FINAL OCR RESULT"); 
        log.info("================================================="); 
 
        log.info( 
                "Image Used: {}", 
                result.imageName 
        ); 
 
        log.info( 
                "PSM Used: {}", 
                result.psmMode 
        ); 
 
        log.info( 
                "Final Score: {}", 
                result.score 
        ); 
 
        log.info( 
                "Quality Level: {}", 
                getQualityLevel( 
                        result.score 
                ) 
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
                "Final Text Length: {}", 
                result.text.length() 
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
 
        private double shortWordRatio; 
 
        private double symbolRatio; 
    } 
} 