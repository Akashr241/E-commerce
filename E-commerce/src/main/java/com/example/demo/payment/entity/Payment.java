package com.example.demo.payment.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import com.example.demo.order.entity.Order;

@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;

    private String paymentMethod;

    private String paymentStatus;

    @OneToOne
    private Order order;

    public Order getOrder() {
        return order;
    }
    public void setOrder(Order order) {
        this.order = order;
    }


    public void setId(Long id) {
        this.id = id;
    }
    public Long getId() {
        return id;
    }
    public void setAmount(Double amount) {
        this.amount = amount;
    } 
    public Double getAmount() {
        return amount;
    }
    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    public String getPaymentMethod() {
        return paymentMethod;
    }
    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
    public String getPaymentStatus() {
        return paymentStatus;
    }
}
