package com.example.demo.payment.service;

//import com.example.demo.order.entity.Order;
import com.example.demo.order.repository.OrderRepository;
import com.example.demo.payment.dto.PaymentRequestDto;
import com.example.demo.payment.dto.PaymentResponseDto;
import com.example.demo.payment.entity.Payment;
import com.example.demo.payment.mapper.PaymentMapper;
import com.example.demo.payment.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import com.example.demo.payment.config.RazorpayConfig;
import com.razorpay.RazorpayClient;
import com.razorpay.Order;
@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final RazorpayClient razorpayClient;
    private final OrderRepository orderRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository,
                             OrderRepository orderRepository,
                            RazorpayClient razorpayClient) {
       this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
        this.razorpayClient=razorpayClient;
    }

    @Override
    public PaymentResponseDto createPayment( PaymentRequestDto dto) {

        Order razorpayOrder = razorpayClient.orders.create(option)
                .orElseThrow(() -> new RuntimeException("Order not found  "));

        Payment payment = new Payment();
        payment.setAmount(order.getTotalAmount());   // if your Order uses getTotalAmount(), change this line
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setPaymentStatus("SUCCESS");
        payment.setOrder(order);

        Payment savedPayment = paymentRepository.save(payment);

        return PaymentMapper.mapToPaymentResponseDto(savedPayment);
    }

    @Override
    public PaymentResponseDto getPaymentById(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found with id: " + paymentId));

        return PaymentMapper.mapToPaymentResponseDto(payment);
    }
}