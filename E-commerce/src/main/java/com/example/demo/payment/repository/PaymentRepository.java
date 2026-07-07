package com.example.demo.payment.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.payment.entity.Payment;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
  Optional<Payment> findByRazorpayOrderId(String razorpayOrderId);
}
