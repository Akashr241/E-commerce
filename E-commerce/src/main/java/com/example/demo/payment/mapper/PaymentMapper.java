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
            dto.setOrderId((String.valueOf(payment.getOrder().getId())));
        }
      //  dto.setkey(razorpayKey);
        dto.setCurrency(payment.getCurrency());
        dto.setSignature(payment.getRazorpaySignature());
       // dto.setrazorpayOrderId(payment.getRazorpayOrderId());
        //dto.setPaymentId(payment.getRazorpayPaymentId());
        return dto;
    }
}