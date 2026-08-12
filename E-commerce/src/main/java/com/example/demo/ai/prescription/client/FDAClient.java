package com.example.demo.ai.prescription.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class FDAClient {

    private final RestTemplate restTemplate;

    public FDAClient() {
        this.restTemplate = new RestTemplate();
    }

    public String searchMedicine(String medicineName) {

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
            System.out.println(response);

            return response;

        } catch (Exception e) {

            System.out.println("========== FDA ERROR ==========");
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();

            return "FDA ERROR: " + e.getMessage();
        }
    }
}