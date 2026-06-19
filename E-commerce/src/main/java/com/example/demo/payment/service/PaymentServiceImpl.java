package com.example.demo.payment.service;
import com.example.demo.payment.dto.PaymentRequestDto;
import com.example.demo.payment.dto.PaymentResponseDto;
import com.example.demo.payment.entity.Payment;
import com.example.demo.payment.mapper.PaymentMapper;
import com.example.demo.payment.repository.PaymentRepository;
import com.example.demo.order.repository.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl
        implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    public PaymentServiceImpl(
            PaymentRepository paymentRepository,
            OrderRepository orderRepository) {

        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    public PaymentResponseDto makePayment(
            Long orderId,
            PaymentRequestDto dto) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        Payment payment = new Payment();

        payment.setAmount(order.getTotalPrice());
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setPaymentStatus("SUCCESS");
        payment.setOrder(order);

        paymentRepository.save(payment);

        return PaymentMapper.toDto(payment);
    }
}