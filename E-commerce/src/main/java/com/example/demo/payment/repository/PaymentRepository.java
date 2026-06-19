package com.example.demo.payment.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.payment.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
  
}
