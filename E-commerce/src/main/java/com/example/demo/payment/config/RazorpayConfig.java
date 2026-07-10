package com.example.demo.payment.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.razorpay.RazorpayClient;

@Configuration
public class RazorpayConfig {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @Bean
    public RazorpayClient razorpayClient() throws Exception {

System.out.println("[" + keyId + "]");
System.out.println("Razorpay Key ID: " + keyId);
System.out.println("ID Length = " + keyId.length());

System.out.println("[" + keySecret + "]");
System.out.println("Secret Length = " + keySecret.length());
System.out.println("Razorpay Key Secret: " + keySecret);

        return new RazorpayClient(keyId, keySecret);

    }
}