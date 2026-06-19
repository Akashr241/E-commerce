package com.example.demo.payment.service;

import com.example.demo.payment.dto.PaymentRequestDto;
import com.example.demo.payment.dto.PaymentResponseDto;

public interface PaymentService {

    PaymentResponseDto makePayment(
            Long orderId,
            PaymentRequestDto dto);

    PaymentResponseDto getPaymentById(Long paymentId);
}