package com.example.demo.payment.service;

import com.example.demo.payment.dto.PaymentRequestDto;
import com.example.demo.payment.dto.PaymentResponseDto;
import com.example.demo.payment.dto.VerifyPaymentRequestDto;

public interface PaymentService {

    PaymentResponseDto createPayment(
            PaymentRequestDto  requestDto) ;
            
            PaymentResponseDto verifyPayment(
        VerifyPaymentRequestDto request);

    PaymentResponseDto getPaymentById(Long paymentId);
}