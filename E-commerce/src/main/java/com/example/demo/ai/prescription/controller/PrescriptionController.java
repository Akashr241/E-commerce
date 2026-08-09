package com.example.demo.ai.prescription.controller;

import com.example.demo.ai.prescription.service.OCRService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.MediaType;
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

    @PostMapping(
        value = "/ocr",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
)
public ResponseEntity<?> testUpload(
        HttpServletRequest request) throws Exception {

    System.out.println("========== MULTIPART DEBUG ==========");

    System.out.println(
            "Content-Type: " + request.getContentType()
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
                "Submitted filename: " + part.getSubmittedFileName()
        );

        System.out.println(
                "Part size: " + part.getSize()
        );

        System.out.println(
                "Part content type: " + part.getContentType()
        );
    }

    System.out.println("======================================");

    return ResponseEntity.ok("Multipart debug completed");
}
}