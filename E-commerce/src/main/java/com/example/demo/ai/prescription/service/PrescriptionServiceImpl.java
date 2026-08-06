package com.example.demo.ai.prescription.service;
import com.example.demo.ai.prescription.dto.PrescriptionResponseDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    @Override
    public PrescriptionResponseDto analyzePrescription(MultipartFile file) {

        // Step 1
        // OCR

        // Step 2
        // Gemini

        // Step 3
        // Validate Medicine

        // Step 4
        // Return Response

        return new PrescriptionResponseDto();

    }

}