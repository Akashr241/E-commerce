package com.example.demo.payment.service;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.example.demo.order.repository.OrderRepository;
import com.example.demo.payment.dto.PaymentRequestDto;
import com.example.demo.payment.dto.PaymentResponseDto;
import com.example.demo.payment.dto.VerifyPaymentRequestDto;
import com.example.demo.payment.entity.Payment;
import com.example.demo.payment.mapper.PaymentMapper;
import com.example.demo.payment.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.example.demo.order.repository.OrderRepository;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final RazorpayClient razorpayClient;
    private final OrderRepository orderRepository;

    public PaymentServiceImpl(
            PaymentRepository paymentRepository,
            RazorpayClient razorpayClient,
            OrderRepository orderRepository) {

        this.paymentRepository = paymentRepository;
        this.razorpayClient = razorpayClient;
        this.orderRepository = orderRepository;
    }

    @Override
    public PaymentResponseDto createPayment(PaymentRequestDto request) {

        try {

            JSONObject options = new JSONObject();

            options.put("amount", (int) (request.getAmount() * 100));

            options.put("currency", "INR");

            options.put("receipt",
                    "receipt_" + System.currentTimeMillis());
        
        System.out.println("Amount : " + request.getAmount());
        System.out.println("Method : " + request.getPaymentMethod());
        System.out.println("Creating Razorpay Order...");


        
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

    e.printStackTrace();

    System.out.println(e.getClass().getName());
    System.out.println(e.getMessage());

            throw new RuntimeException(
                    "Error while creating payment", e);

                    

        }
    }
@Override
public PaymentResponseDto verifyPayment(
        VerifyPaymentRequestDto request) {

    Payment payment =
            paymentRepository
                    .findByRazorpayOrderId(
                            request.getRazorpayOrderId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Payment not found"));

    payment.setRazorpayPaymentId(
            request.getRazorpayPaymentId());

    payment.setRazorpaySignature(
            request.getRazorpaySignature());

    payment.setPaymentStatus("SUCCESS");

    paymentRepository.save(payment);

    return PaymentMapper
            .mapToPaymentResponseDto(payment);
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