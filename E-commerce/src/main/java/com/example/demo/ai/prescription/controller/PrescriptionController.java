package com.example.demo.ai.prescription.controller;
import com.example.demo.ai.prescription.dto.PrescriptionResponseDto;
import com.example.demo.ai.prescription.service.PrescriptionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/prescriptions")
@CrossOrigin(origins = "*")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    @PostMapping(value = "/analyze", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PrescriptionResponseDto> analyzePrescription(
            @RequestParam("file") MultipartFile file) {

        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        PrescriptionResponseDto response =
                prescriptionService.analyzePrescription(file);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
