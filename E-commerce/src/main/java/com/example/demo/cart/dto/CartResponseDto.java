package com.example.demo.cart.dto;

import java.util.List;

public class CartResponseDto {

    private Long id;
    private double total;
    private List<CartItemResponseDto> cartItems;

    public CartResponseDto() {
    }

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

    public void setId(Long id) {
        this.id = id;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public void setCartItems(List<CartItemResponseDto> cartItems) {
        this.cartItems = cartItems;
    }
}