package com.example.demo.payment.controller;

import com.example.demo.payment.dto.PaymentRequestDto;
import com.example.demo.payment.dto.PaymentResponseDto;
import com.example.demo.payment.dto.VerifyPaymentRequestDto;
import com.example.demo.payment.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create")
    public ResponseEntity<PaymentResponseDto> createPayment(
            @Valid @RequestBody PaymentRequestDto request) {

        return ResponseEntity.ok(
                paymentService.createPayment(request));
    }
    @PostMapping("/verify")
public ResponseEntity<PaymentResponseDto> verifyPayment(
        @RequestBody VerifyPaymentRequestDto request){

    return ResponseEntity.ok(
            paymentService.verifyPayment(request));
}

    @GetMapping("/{id}")
    public ResponseEntity<PaymentResponseDto> getPayment(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                paymentService.getPaymentById(id));
    }
}