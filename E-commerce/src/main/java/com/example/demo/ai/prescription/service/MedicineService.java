
package com.example.demo.ai.prescription.service;

import com.example.demo.ai.prescription.dto.MedicineResponseDto;

import java.util.List;

public interface MedicineService {

    List<MedicineResponseDto> searchMedicine(String name);

}