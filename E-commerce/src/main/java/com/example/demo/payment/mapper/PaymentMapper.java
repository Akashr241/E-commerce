package com.example.demo.payment.mapper;

import com.example.demo.payment.dto.PaymentResponseDto;
import com.example.demo.payment.entity.Payment;

public class PaymentMapper {

    private PaymentMapper() {
    }

    public static PaymentResponseDto mapToPaymentResponseDto(
            Payment payment) {

        PaymentResponseDto dto = new PaymentResponseDto();

        dto.setId(payment.getId());
        dto.setAmount(payment.getAmount());
        dto.setPaymentMethod(payment.getPaymentMethod());
        dto.setPaymentStatus(payment.getPaymentStatus());

        if (payment.getOrder() != null) {
            dto.setOrderId(payment.getOrder().getId());
        }

        return dto;
    }
}