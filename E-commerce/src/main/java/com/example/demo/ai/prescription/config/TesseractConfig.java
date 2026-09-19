package com.example.demo.ai.prescription.config;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TesseractConfig {

    @Bean
    public ITesseract tesseract(
            @Value("${tesseract.datapath}") String datapath) {

        Tesseract tesseract = new Tesseract();

        // Tesseract tessdata folder
        tesseract.setDatapath(datapath);

        // English language
        tesseract.setLanguage("eng");

        return tesseract;
    }
}