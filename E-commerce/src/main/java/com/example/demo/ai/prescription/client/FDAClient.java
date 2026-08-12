
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

        return restTemplate.getForObject(url, String.class);
    }
}