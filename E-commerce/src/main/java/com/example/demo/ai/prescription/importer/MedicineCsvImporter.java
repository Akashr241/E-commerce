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
import java.io.InputStream;
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

        // =================================================
        // CSV FILE FROM RESOURCES
        // =================================================

        ClassPathResource resource =
                new ClassPathResource(
                        "indian_medicine_data1.csv"
                );


        // =================================================
        // CHECK CSV FILE
        // =================================================

        System.out.println("CSV FILE TEST");
        System.out.println(
                "File: indian_medicine_data1.csv"
        );

        System.out.println(
                "Exists: " + resource.exists()
        );

        System.out.println("======================================");


        if (!resource.exists()) {

            throw new RuntimeException(
                    "CSV file not found in resources: "
                            + "indian_medicine_data1.csv"
            );
        }


        // =================================================
        // READ CSV FROM CLASSPATH
        // =================================================

        try (

                InputStream inputStream =
                        resource.getInputStream();

                Reader reader =
                        new BufferedReader(
                                new InputStreamReader(
                                        inputStream,
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


            // =================================================
            // READ EACH CSV RECORD
            // =================================================

            for (CSVRecord record : csvParser) {

                Medicine medicine =
                        new Medicine();


                // =================================================
                // ID
                // =================================================

                medicine.setId(
                        Long.valueOf(
                                record.get(0).trim()
                        )
                );


                // =================================================
                // NAME
                // =================================================

                medicine.setName(
                        record.get("name")
                );


                // =================================================
                // PRICE
                // =================================================

                String price =
                        record.get("price");

                if (
                        price != null
                                &&
                        !price.isBlank()
                ) {

                    medicine.setPrice(
                            Double.valueOf(
                                    price
                            )
                    );
                }


                // =================================================
                // DISCONTINUED
                // =================================================

                String discontinued =
                        record.get(
                                "Is_discontinued"
                        );

                if (
                        discontinued != null
                                &&
                        !discontinued.isBlank()
                ) {

                    medicine.setDiscontinued(
                            Boolean.valueOf(
                                    discontinued
                            )
                    );
                }


                // =================================================
                // MANUFACTURER
                // =================================================

                medicine.setManufacturerName(
                        record.get(
                                "manufacturer_name"
                        )
                );


                // =================================================
                // TYPE
                // =================================================

                medicine.setType(
                        record.get("type")
                );


                // =================================================
                // PACK SIZE
                // =================================================

                medicine.setPackSizeLabel(
                        record.get(
                                "pack_size_label"
                        )
                );


                // =================================================
                // COMPOSITION 1
                // =================================================

                medicine.setShortComposition1(
                        record.get(
                                "short_composition1"
                        )
                );


                // =================================================
                // COMPOSITION 2
                // =================================================

                medicine.setShortComposition2(
                        record.get(
                                "short_composition2"
                        )
                );


                // =================================================
                // ADD TO BATCH
                // =================================================

                batch.add(
                        medicine
                );


                // =================================================
                // SAVE EVERY 1000 RECORDS
                // =================================================

                if (
                        batch.size()
                                >=
                        BATCH_SIZE
                ) {

                    medicineRepository.saveAll(
                            batch
                    );

                    count +=
                            batch.size();


                    System.out.println(
                            "Imported medicines: "
                                    +
                                    count
                    );


                    batch.clear();
                }
            }


            // =================================================
            // SAVE REMAINING RECORDS
            // =================================================

            if (!batch.isEmpty()) {

                medicineRepository.saveAll(
                        batch
                );

                count +=
                        batch.size();
            }


            // =================================================
            // IMPORT COMPLETE
            // =================================================

            System.out.println(
                    "======================================"
            );

            System.out.println(
                    "TOTAL MEDICINES IMPORTED: "
                            +
                            count
            );

            System.out.println(
                    "======================================"
            );
        }
    }
}