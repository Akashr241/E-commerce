package com.example.demo.ai.prescription.service;

import com.example.demo.ai.prescription.dto.PrescriptionResponseDto;
import java.util.List;

public interface PrescriptionService {



    List<PrescriptionResponseDto> analyzePrescription(
            String extractedText);

}
