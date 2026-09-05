
package com.example.demo.ai.prescription.config;
import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TesseractConfig {

    @Bean
    public ITesseract tesseract() {

        Tesseract tesseract =
                new Tesseract();

        // Tesseract installation tessdata folder
        tesseract.setDatapath(
                "C:\\Program Files\\Tesseract-OCR\\tessdata"
        );

        // English language
        tesseract.setLanguage(
                "eng"
        );

        return tesseract;
    }
}