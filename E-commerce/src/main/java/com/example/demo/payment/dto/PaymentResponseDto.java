package com.example.demo.payment.dto;

public class PaymentResponseDto {

    private Long id;
    private Double amount;
    private String paymentMethod;
    private String paymentStatus;

    // Razorpay Order ID
    private String orderId;

    // Razorpay Public Key
    private String key;

    // Currency (INR)
    private String currency;

    private String paymentId;
    // Razorpay Signature
    private String signature;

    public PaymentResponseDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getsignature() {
        return signature;
    }


    public void setsignature(String signature) {
        this.signature = signature;
    }
    public String paymentId(){
        return paymentId;
    }
    public void setpaymentId(String paymentId){
        this.paymentId=paymentId;
    }
    public String key(){
        return key;
    }
    public void setkey(String key){
        this.key=key;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }
}