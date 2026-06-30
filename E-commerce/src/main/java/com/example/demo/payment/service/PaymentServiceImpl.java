package com.example.demo.payment.service;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.example.demo.payment.dto.PaymentRequestDto;
import com.example.demo.payment.dto.PaymentResponseDto;
import com.example.demo.payment.entity.Payment;
import com.example.demo.payment.mapper.PaymentMapper;
import com.example.demo.payment.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final RazorpayClient razorpayClient;

    public PaymentServiceImpl(
            PaymentRepository paymentRepository,
            RazorpayClient razorpayClient) {

        this.paymentRepository = paymentRepository;
        this.razorpayClient = razorpayClient;
    }

    @Override
    public PaymentResponseDto createPayment(PaymentRequestDto request) {

        try {

            JSONObject options = new JSONObject();

            options.put("amount", (int) (request.getAmount() * 100));

            options.put("currency", "INR");

            options.put("receipt",
                    "receipt_" + System.currentTimeMillis());

            Order razorpayOrder =
                    razorpayClient.orders.create(options);

            Payment payment = new Payment();

            payment.setAmount(request.getAmount());

            payment.setCurrency("INR");

            payment.setPaymentMethod(
                    request.getPaymentMethod());

            payment.setPaymentStatus("CREATED");

            payment.setRazorpayOrderId(
                    razorpayOrder.get("id"));

            Payment savedPayment =
                    paymentRepository.save(payment);

            return PaymentMapper
                    .mapToPaymentResponseDto(savedPayment);

        } catch (Exception e) {

            throw new RuntimeException(
                    "Error while creating payment", e);

        }
    }

    @Override
    public PaymentResponseDto getPaymentById(Long paymentId) {

        Payment payment =
                paymentRepository.findById(paymentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Payment not found"));

        return PaymentMapper
                .mapToPaymentResponseDto(payment);

    }

}