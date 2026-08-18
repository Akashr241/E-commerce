package com.example.demo.ai.prescription.controller;

import com.example.demo.ai.prescription.dto.MedicineResponseDto;
import com.example.demo.ai.prescription.service.MedicineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    private final MedicineService medicineService;

    public MedicineController(
            MedicineService medicineService) {

        this.medicineService = medicineService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<MedicineResponseDto>> searchMedicine(
            @RequestParam String name) {

        List<MedicineResponseDto> medicines =
                medicineService.searchMedicine(name);

        return ResponseEntity.ok(medicines);
    }
}