package com.example.demo.payment.mapper;

import com.example.demo.payment.dto.PaymentResponseDto;
import com.example.demo.payment.entity.Payment;

public class PaymentMapper {

    private PaymentMapper() {
    }

    public static PaymentResponseDto mapToPaymentResponseDto(Payment payment) {

        PaymentResponseDto dto = new PaymentResponseDto();

        dto.setId(payment.getId());
        dto.setAmount(payment.getAmount());
        dto.setCurrency(payment.getCurrency());
        dto.setPaymentMethod(payment.getPaymentMethod());
        dto.setPaymentStatus(payment.getPaymentStatus());
        dto.setRazorpayOrderId(payment.getRazorpayOrderId());
        dto.setRazorpayPaymentId(payment.getRazorpayPaymentId());
        dto.setRazorpaySignature(payment.getRazorpaySignature());

        return dto;
    }
}