package com.example.demo.ai.prescription.controller;

import com.example.demo.ai.prescription.service.OCRService;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.demo.ai.prescription.service.PrescriptionService;
@RestController
@RequestMapping("/api/prescription")
public class PrescriptionController {

    private final OCRService ocrService;
    private final PrescriptionService prescriptionService;

    public PrescriptionController(OCRService ocrService,
                                PrescriptionService prescriptionService) {
        this.ocrService = ocrService;
        this.prescriptionService = prescriptionService;
    }

@PostMapping(
    value = "/analyze",
    consumes = MediaType.MULTIPART_FORM_DATA_VALUE
)
public ResponseEntity<String> analyzePrescription(
        @RequestParam("file") MultipartFile file) {

    String extractedText = ocrService.extractText(file);

    String result =
            prescriptionService.analyzePrescription(extractedText);

    return ResponseEntity.ok(result);
}


    @PostMapping(
            value = "/ocr",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> extractText(
            @RequestParam(value = "file", required = false) MultipartFile file,
            HttpServletRequest request) throws Exception {

        System.out.println("========== OCR REQUEST DEBUG ==========");

        System.out.println(
                "Content-Type: " + request.getContentType()
        );

        System.out.println(
                "File object: " + file
        );

        var parts = request.getParts();

        System.out.println(
                "Number of parts: " + parts.size()
        );

        for (var part : parts) {

            System.out.println(
                    "Part name: " + part.getName()
            );

            System.out.println(
                    "Filename: " + part.getSubmittedFileName()
            );

            System.out.println(
                    "Size: " + part.getSize()
            );

            System.out.println(
                    "Content type: " + part.getContentType()
            );
        }

        System.out.println("======================================");

        if (file == null) {

            return ResponseEntity.badRequest()
                    .body("FILE IS NULL");
        }

        System.out.println("FILE RECEIVED SUCCESSFULLY!");

        String text = ocrService.extractText(file);

        return ResponseEntity.ok(text);
    }
}