package com.example.demo.cart.dto;

import java.util.List;

public class CartResponseDto {

    private Long id;

    private double total;

    private List<CartItemResponseDto> cartItems;

    public CartResponseDto(
            Long id,
            double total,
            List<CartItemResponseDto> cartItems) {

        this.id = id;
        this.total = total;
        this.cartItems = cartItems;
    }

    public Long getId() {
        return id;
    }

    public double getTotal() {
        return total;
    }

    public List<CartItemResponseDto> getCartItems() {
        return cartItems;
    }
}