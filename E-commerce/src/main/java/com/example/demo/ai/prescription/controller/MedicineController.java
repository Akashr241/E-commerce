package com.example.demo.ai.prescription.controller;

import com.example.demo.ai.prescription.dto.MedicineResponseDto;
import com.example.demo.ai.prescription.service.MedicineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.ai.prescription.importer.MedicineCsvImporter;
import java.util.List;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    private final MedicineService medicineService;
    private final MedicineCsvImporter medicineCsvImporter;

    public MedicineController(
            MedicineService medicineService,
            MedicineCsvImporter medicineCsvImporter) {

        this.medicineService = medicineService;
        this.medicineCsvImporter = medicineCsvImporter;
    }

    @PostMapping("/import")
public ResponseEntity<String> importMedicines() {

    try {

        medicineCsvImporter.importMedicines();

        return ResponseEntity.ok(
                "Medicine CSV imported successfully"
        );

    } catch (Exception e) {

        e.printStackTrace();

        return ResponseEntity.internalServerError()
                .body(
                        "Medicine import failed: "
                                + e.getMessage()
                );
    }
}

    @GetMapping("/search")
    public ResponseEntity<List<MedicineResponseDto>> searchMedicine(
            @RequestParam String name) {

        List<MedicineResponseDto> medicines =
                medicineService.searchMedicine(name);

        return ResponseEntity.ok(medicines);
    }


}