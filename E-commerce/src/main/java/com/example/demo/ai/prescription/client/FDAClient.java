package com.example.demo.ai.prescription.client;

import com.example.demo.ai.prescription.dto.FDAMedicineDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;

@Component
public class FDAClient {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public FDAClient() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();

            System.out.println("========== FDA CLIENT CREATED ==========");

    }
    

    public FDAMedicineDto searchMedicine(String medicineName) {

        System.out.println("========== FDA CLIENT  file was recevied ==========" +
                "Medicine: " + medicineName);

        medicineName = medicineName.trim();

        String encodedName =
                UriUtils.encodeQueryParam(
                        medicineName,
                        StandardCharsets.UTF_8
                );

        String url =
                "https://api.fda.gov/drug/label.json"
                + "?search=openfda.brand_name:"
                + encodedName
                + "&limit=10";

        System.out.println("========== FDA DEBUG ==========");
        System.out.println("Medicine searched: " + medicineName);
        System.out.println("FDA URL: " + url);
        System.out.println("================================");

        try {

            String response =
                    restTemplate.getForObject(url, String.class);

            JsonNode root =
                    objectMapper.readTree(response);

            JsonNode results =
                    root.path("results");

            if (!results.isArray() || results.size() == 0) {

                System.out.println(
                        "FDA RESULT NOT FOUND: " + medicineName
                );

                return null;
            }

            /*
             * Check every returned result.
             * Do NOT blindly use results[0].
             */

            for (JsonNode result : results) {

                String brandName =
                        getFirstValue(
                                result,
                                "openfda",
                                "brand_name"
                        );

                System.out.println(
                        "FDA candidate: " + brandName
                );

                if (brandName != null &&
                        brandName.equalsIgnoreCase(medicineName)) {

                    System.out.println(
                            "FDA EXACT MATCH FOUND: "
                            + brandName
                    );

                    return convertToDto(result);
                }
            }

            System.out.println(
                    "FDA returned results, but none matched: "
                    + medicineName
            );

            return null;

        } catch (Exception e) {

            System.out.println("========== FDA ERROR ==========");
            System.out.println(e.getMessage());

            return null;
        }
    }


    private FDAMedicineDto convertToDto(JsonNode result) {

        FDAMedicineDto medicine =
                new FDAMedicineDto();

        medicine.setMedicineName(
                getFirstValue(
                        result,
                        "openfda",
                        "brand_name"
                )
        );

        medicine.setGenericName(
                getFirstValue(
                        result,
                        "openfda",
                        "generic_name"
                )
        );

        medicine.setActiveIngredient(
                getFirstValue(
                        result,
                        "active_ingredient"
                )
        );

        medicine.setPurpose(
                getFirstValue(
                        result,
                        "purpose"
                )
        );

        medicine.setIndications(
                getFirstValue(
                        result,
                        "indications_and_usage"
                )
        );

        medicine.setDosage(
                getFirstValue(
                        result,
                        "dosage_and_administration"
                )
        );

        medicine.setWarnings(
                getFirstValue(
                        result,
                        "warnings"
                )
        );

        return medicine;
    }


    private String getFirstValue(
            JsonNode parent,
            String objectName,
            String fieldName) {

        JsonNode node =
                parent
                        .path(objectName)
                        .path(fieldName);

        if (node.isArray() &&
                node.size() > 0) {

            return node.get(0).asText();
        }

        return null;
    }


    private String getFirstValue(
            JsonNode parent,
            String fieldName) {

        JsonNode node =
                parent.path(fieldName);

        if (node.isArray() &&
                node.size() > 0) {

            return node.get(0).asText();
        }

        
        return null;
    }
}
