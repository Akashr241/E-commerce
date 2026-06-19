package com.example.demo.payment.dto;

import com.example.demo.payment.entity.Payment;



public static PaymentResponseDto mapToPaymentResponseDto(
        Payment payment) {

    PaymentResponseDto dto = new PaymentResponseDto();

    dto.setId(payment.getId());
    dto.setAmount(payment.getAmount());
    dto.setPaymentMethod(payment.getPaymentMethod());
    dto.setPaymentStatus(payment.getPaymentStatus());

    return dto;
}

