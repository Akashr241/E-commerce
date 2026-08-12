package com.example.demo.ai.prescription.service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class FDAServiceImpl implements FDAService {

    @Value("${openfda.api.key}")
    private String apiKey;

    @Value("${openfda.api.url}")
    private String apiUrl;

    @Override
    public String searchMedicine(String medicineName) {

        RestTemplate restTemplate = new RestTemplate();

        String url = apiUrl
                + "?search=openfda.brand_name:"
                + medicineName
                + "&api_key="
                + apiKey;

        return restTemplate.getForObject(url, String.class);
    }
}
