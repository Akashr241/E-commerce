package com.example.demo.ai.prescription.controller;
import org.springframework.web.bind.annotation.RequestPart;
import com.example.demo.ai.prescription.service.OCRService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/prescription")
public class PrescriptionController {

    private final OCRService ocrService;

    public PrescriptionController(OCRService ocrService) {
        this.ocrService = ocrService;
    }

    @PostMapping("/ocr")
    public ResponseEntity<Map<String, String>> extractPrescriptionText(
            @RequestParam("file") MultipartFile file) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Please upload a prescription image"));
        }

        String extractedText = ocrService.extractText(file);

        return ResponseEntity.ok(
                Map.of("text", extractedText)
        );
    }
}