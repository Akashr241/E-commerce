package com.example.demo.payment.service;

import com.example.demo.payment.dto.PaymentRequestDto;
import com.example.demo.payment.dto.PaymentResponseDto;

public interface PaymentService {

    PaymentResponseDto createPayment(
            PaymentRequestDto  requestDto) throws Exception;

    PaymentResponseDto getPaymentById(Long paymentId);
}