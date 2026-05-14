package com.example.demo.cart.dto;

import java.util.List;

public class CartResponseDto {

    private Long id;

    private double totalPrice;

    private List<CartItemResponseDto> cartItems;

    public CartResponseDto(
            Long id,
            double totalPrice,
            List<CartItemResponseDto> cartItems) {

        this.id = id;
        this.totalPrice = totalPrice;
        this.cartItems = cartItems;
    }

    public Long getId() {
        return id;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public List<CartItemResponseDto> getCartItems() {
        return cartItems;
    }
}