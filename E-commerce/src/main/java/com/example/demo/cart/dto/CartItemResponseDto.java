package com.example.demo.cart.dto;

public class CartItemResponseDto {

    private Long id;

    private String productName;

    private int quantity;

    private double subTotal;

    public CartItemResponseDto(
            Long id,
            String productName,
            int quantity,
            double subTotal) {

        this.id = id;
        this.productName = productName;
        this.quantity = quantity;
        this.subTotal = subTotal;
    }

    public Long getId() {
        return id;
    }

    public String getProductName() {
        return productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public double getSubTotal() {
        return subTotal;
    }
}