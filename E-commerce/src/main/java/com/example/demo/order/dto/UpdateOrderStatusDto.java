package com.example.demo.order.dto;

import com.example.demo.order.entity.OrderStatus;

import jakarta.validation.constraints.NotNull;

public class UpdateOrderStatusDto {
    @NotNull
    private OrderStatus status;

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }
}