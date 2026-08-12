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

    System.out.println("========== FDA SERVICE ==========");
    System.out.println("Medicine: " + medicineName);
    System.out.println("FDA URL: " + apiUrl);
    System.out.println("API Key loaded: " + (apiKey != null));
    System.out.println("=================================");

    RestTemplate restTemplate = new RestTemplate();

    String url = apiUrl
            + "?search=openfda.brand_name:"
            + medicineName
            + "&api_key="
            + apiKey;

    System.out.println("Calling FDA API...");
    System.out.println("Request URL: " + url.replace(apiKey, "HIDDEN"));




    

    String response = restTemplate.getForObject(url, String.class);

    System.out.println("FDA API response received!");

    return response;
}
    }






