package com.example.demo.cart.dto;

import jakarta.validation.constraints.NotNull;

public class AddProductToCartRequest {
    @NotNull
    private Long cartId;
    
    @NotNull
    private Long productId;

    @jakarta.validation.constraints.Positive
    private int quantity;

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
