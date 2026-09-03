package com.example.demo.order.dto;

import java.util.List;

public class OrderHistoryResponseDto {

    private Long id;

    private Double totalPrice;

    private String status;

    // ==========================================
    // ORDER ITEMS
    // ==========================================

    private List<OrderItemResponseDto> orderItems;


    // ==========================================
    // ID
    // ==========================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    // ==========================================
    // TOTAL PRICE
    // ==========================================

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }


    // ==========================================
    // STATUS
    // ==========================================

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    // ==========================================
    // ORDER ITEMS
    // ==========================================

    public List<OrderItemResponseDto> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(
            List<OrderItemResponseDto> orderItems
    ) {
        this.orderItems = orderItems;
    }
}