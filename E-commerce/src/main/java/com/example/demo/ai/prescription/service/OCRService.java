package com.example.demo.ai.prescription.service;
import org.springframework.web.multipart.MultipartFile;

public interface OCRService {

    String extractText(MultipartFile file);

}