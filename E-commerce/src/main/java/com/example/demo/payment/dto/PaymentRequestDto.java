package com.example.demo.payment.dto;

import jakarta.validation.constraints.NotNull;

public class PaymentRequestDto {
    @NotNull
    private String paymentMethod;

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}