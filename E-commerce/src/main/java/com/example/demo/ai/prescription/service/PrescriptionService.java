package com.example.demo.ai.prescription.service;

import com.example.demo.ai.prescription.dto.PrescriptionResponseDto;
import org.springframework.web.multipart.MultipartFile;

public interface PrescriptionService {

    PrescriptionResponseDto analyzePrescription(MultipartFile file);

}
