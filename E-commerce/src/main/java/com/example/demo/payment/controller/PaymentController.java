package com.example.demo.payment.controller;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import com.example.demo.payment.dto.PaymentRequestDto;
import com.example.demo.payment.dto.PaymentResponseDto;
import com.example.demo.payment.service.PaymentService;
import org.springframework.web.bind.annotation.*;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/{orderId}")
    public PaymentResponseDto makePayment(
            @PathVariable Long orderId,
            @RequestBody PaymentRequestDto dto) {

        return paymentService.makePayment(orderId, dto);
    }

    @GetMapping("/{paymentId}")
    public PaymentResponseDto getPaymentById(@PathVariable Long paymentId) {
        return paymentService.getPaymentById(paymentId);
    }
}