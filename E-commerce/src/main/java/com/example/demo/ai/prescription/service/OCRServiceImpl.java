package com.example.demo.ai.prescription.service;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;

@Service
public class OCRServiceImpl implements OCRService {

    private final Tesseract tesseract;

    public OCRServiceImpl() {

        tesseract = new Tesseract();

        // Tesseract installation folder
        tesseract.setDatapath(
                "C:/Program Files/Tesseract-OCR/tessdata"
        );

        // English language
        tesseract.setLanguage("eng");
    }

    @Override
    public String extractText(MultipartFile file) {

        try {

            // Convert uploaded file into an image
            BufferedImage image = ImageIO.read(file.getInputStream());

            if (image == null) {
                throw new RuntimeException(
                        "Unable to read the uploaded image"
                );
            }

            // Send image to Tesseract
            String extractedText = tesseract.doOCR(image);

            return extractedText;

        } catch (IOException e) {

            throw new RuntimeException(
                    "Error reading prescription image",
                    e
            );

        } catch (TesseractException e) {

            throw new RuntimeException(
                    "Error extracting text using Tesseract",
                    e
            );
        }
    }
}