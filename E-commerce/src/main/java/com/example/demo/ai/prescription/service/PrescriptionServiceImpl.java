package com.example.demo.ai.prescription.service;
import com.example.demo.ai.prescription.dto.PrescriptionResponseDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


        @Service
public class PrescriptionServiceImpl implements PrescriptionService {

    private final OCRService ocrService;

    public PrescriptionServiceImpl(OCRService ocrService) {
        this.ocrService = ocrService;
    }

    @Override
    public PrescriptionResponseDto analyzePrescription(MultipartFile file) {

        String extractedText =
                ocrService.extractText(file);

        System.out.println(extractedText);

        return new PrescriptionResponseDto();

    }

}

        