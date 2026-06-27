package com.example.demo.checkout.controller;

import com.example.demo.checkout.dto.CheckoutRequestDto;
import com.example.demo.checkout.dto.CheckoutResponseDto;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import com.example.demo.checkout.service.CheckoutService;
@RestController
@RequestMapping("/checkout")
public class CheckoutController {

    @Autowired
    private CheckoutService checkoutService;

    @PostMapping
    public ResponseEntity<CheckoutResponseDto> checkout(
            @RequestBody CheckoutRequestDto request) {

        return ResponseEntity.ok(checkoutService.checkout(request));
    }
}