package com.example.demo.ai.prescription.importer;

import com.example.demo.ai.prescription.entity.Medicine;
import com.example.demo.ai.prescription.repository.MedicineRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Component
public class MedicineCsvImporter {

    private final MedicineRepository medicineRepository;

    private static final int BATCH_SIZE = 1000;

    public MedicineCsvImporter(
            MedicineRepository medicineRepository) {

        this.medicineRepository = medicineRepository;
    }

    @Transactional
    public void importMedicines() throws Exception {

        System.out.println("======================================");
        System.out.println("MEDICINE CSV IMPORT STARTED");
        System.out.println("======================================");

        ClassPathResource resource =
                new ClassPathResource(
                        "data/indian_medicine_data.csv"
                );

        try (
                Reader reader = new BufferedReader(
                        new InputStreamReader(
                                resource.getInputStream(),
                                StandardCharsets.UTF_8
                        )
                );

                CSVParser csvParser =
                        CSVFormat.DEFAULT
                                .builder()
                                .setHeader()
                                .setSkipHeaderRecord(true)
                                .build()
                                .parse(reader)
        ) {

            List<Medicine> batch =
                    new ArrayList<>();

            int count = 0;

            for (CSVRecord record : csvParser) {

                Medicine medicine = new Medicine();

                medicine.setId(
                        Long.valueOf(
                                record.get("id")
                        )
                );

                medicine.setName(
                        record.get("name")
                );

                String price =
                        record.get("price");

                if (price != null &&
                        !price.isBlank()) {

                    medicine.setPrice(
                            Double.valueOf(price)
                    );
                }

                String discontinued =
                        record.get("is_discontinued");

                if (discontinued != null &&
                        !discontinued.isBlank()) {

                    medicine.setDiscontinued(
                            Boolean.valueOf(
                                    discontinued
                            )
                    );
                }

                medicine.setManufacturerName(
                        record.get("manufacturer_name")
                );

                medicine.setType(
                        record.get("type")
                );

                medicine.setPackSizeLabel(
                        record.get("pack_size_label")
                );

                medicine.setShortComposition1(
                        record.get("short_composition1")
                );

                medicine.setShortComposition2(
                        record.get("short_composition2")
                );

                batch.add(medicine);

                if (batch.size() >= BATCH_SIZE) {

                    medicineRepository.saveAll(batch);

                    count += batch.size();

                    System.out.println(
                            "Imported medicines: "
                                    + count
                    );

                    batch.clear();
                }
            }

            // Save remaining records

            if (!batch.isEmpty()) {

                medicineRepository.saveAll(batch);

                count += batch.size();
            }

            System.out.println(
                    "======================================"
            );

            System.out.println(
                    "TOTAL MEDICINES IMPORTED: "
                            + count
            );

            System.out.println(
                    "======================================"
            );
        }
    }
}