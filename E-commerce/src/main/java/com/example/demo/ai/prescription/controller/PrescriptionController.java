package com.example.demo.ai.prescription.controller;

import com.example.demo.ai.prescription.dto.OCRResponseDto;
import com.example.demo.ai.prescription.service.OCRService;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/prescription")
public class PrescriptionController {

    private final OCRService ocrService;

    public PrescriptionController(OCRService ocrService) {
        this.ocrService = ocrService;
    }

    @PostMapping(
            value = "/ocr",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<OCRResponseDto> extractText(
            @RequestParam("file") MultipartFile file) {

        if (file == null || file.isEmpty()) {

            return ResponseEntity.badRequest().build();
        }

        String extractedText =
                ocrService.extractText(file);

        OCRResponseDto response =
                new OCRResponseDto(extractedText);

        return ResponseEntity.ok(response);
    }
}