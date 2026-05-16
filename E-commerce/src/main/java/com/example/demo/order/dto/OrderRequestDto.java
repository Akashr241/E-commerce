package com.example.demo.order.dto;

public class OrderRequestDto {

    private Long cartId;

    public OrderRequestDto() {
    }

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }
}