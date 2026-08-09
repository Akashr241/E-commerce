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

        System.out.println("========== TESSERACT INITIALIZATION ==========");

        tesseract = new Tesseract();

        String tessDataPath =
                "C:/Program Files/Tesseract-OCR/tessdata";

        System.out.println("Tesseract data path: " + tessDataPath);

        tesseract.setDatapath(tessDataPath);
        tesseract.setLanguage("eng");

        System.out.println("Tesseract initialized successfully.");
        System.out.println("==============================================");
    }

    @Override
    public String extractText(MultipartFile file) {

        System.out.println("========== OCR SERVICE ==========");

        if (file == null) {
            System.out.println("ERROR: MultipartFile is NULL");
            throw new RuntimeException("File is null");
        }

        System.out.println(
                "Filename: " + file.getOriginalFilename()
        );

        System.out.println(
                "Content Type: " + file.getContentType()
        );

        System.out.println(
                "File Size: " + file.getSize()
        );

        try {

            BufferedImage image =
                    ImageIO.read(file.getInputStream());

            if (image == null) {

                System.out.println(
                        "ERROR: ImageIO could not read image"
                );

                throw new RuntimeException(
                        "Unable to read uploaded image"
                );
            }

            System.out.println(
                    "Image successfully converted to BufferedImage"
            );

            System.out.println(
                    "Image width: " + image.getWidth()
            );

            System.out.println(
                    "Image height: " + image.getHeight()
            );

            System.out.println(
                    "Sending image to Tesseract..."
            );

            String extractedText =
                    tesseract.doOCR(image);

            System.out.println(
                    "Tesseract OCR completed successfully."
            );

            System.out.println("========== EXTRACTED TEXT ==========");
            System.out.println(extractedText);
            System.out.println("====================================");

            return extractedText;

        } catch (IOException e) {

            System.out.println(
                    "ERROR: Could not read uploaded file"
            );

            e.printStackTrace();

            throw new RuntimeException(
                    "Error reading prescription image",
                    e
            );

        } catch (TesseractException e) {

            System.out.println(
                    "ERROR: Tesseract OCR failed"
            );

            e.printStackTrace();

            throw new RuntimeException(
                    "Error extracting text using Tesseract",
                    e
            );
        }
    }
}