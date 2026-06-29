package com.example.demo.payment.dto;

import jakarta.validation.constraints.NotNull;

public class PaymentRequestDto {
    @NotNull
    private String paymentMethod;
    private double amount;


    public PaymentRequestDto(double amount,String paymentMethod){
        this.amount=amount;
        this.paymentMethod=paymentMethod;
    }
    public double getAmount(){
        return amount;
    }
    public void setAmount(double amount){
        this.amount=amount;
    }
    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}