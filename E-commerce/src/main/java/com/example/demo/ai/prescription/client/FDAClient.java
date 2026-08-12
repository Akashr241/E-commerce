package com.example.demo.ai.prescription.client;

import com.example.demo.ai.prescription.dto.FDAMedicineDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class FDAClient {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public FDAClient() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    public FDAMedicineDto searchMedicine(String medicineName) {

        String url =
                "https://api.fda.gov/drug/label.json"
                + "?search=openfda.brand_name:"
                + medicineName
                + "&limit=1";

        System.out.println("========== FDA DEBUG ==========");
        System.out.println("Medicine: " + medicineName);
        System.out.println("FDA URL: " + url);

        try {

            String response =
                    restTemplate.getForObject(url, String.class);

            System.out.println("FDA RESPONSE RECEIVED");

            JsonNode root =
                    objectMapper.readTree(response);

            JsonNode result =
                    root.path("results").get(0);

            FDAMedicineDto medicine =
                    new FDAMedicineDto();

            medicine.setMedicineName(
                    getFirstValue(result, "openfda", "brand_name")
            );

            medicine.setGenericName(
                    getFirstValue(result, "openfda", "generic_name")
            );

            medicine.setActiveIngredient(
                    getFirstValue(result, "active_ingredient")
            );

            medicine.setPurpose(
                    getFirstValue(result, "purpose")
            );

            medicine.setIndications(
                    getFirstValue(result, "indications_and_usage")
            );

            medicine.setDosage(
                    getFirstValue(result, "dosage_and_administration")
            );

            medicine.setWarnings(
                    getFirstValue(result, "warnings")
            );

            return medicine;

        } catch (Exception e) {

            System.out.println("========== FDA ERROR ==========");
            System.out.println(e.getMessage());
            e.printStackTrace();

            return null;
        }
    }

    private String getFirstValue(
            JsonNode parent,
            String objectName,
            String fieldName) {

        JsonNode node =
                parent.path(objectName).path(fieldName);

        if (node.isArray() && node.size() > 0) {
            return node.get(0).asText();
        }

        return null;
    }

    private String getFirstValue(
            JsonNode parent,
            String fieldName) {

        JsonNode node =
                parent.path(fieldName);

        if (node.isArray() && node.size() > 0) {
            return node.get(0).asText();
        }

        return null;
    }
}