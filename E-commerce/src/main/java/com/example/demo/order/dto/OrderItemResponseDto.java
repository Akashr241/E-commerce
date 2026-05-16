package com.example.demo.order.dto;

public class OrderItemResponseDto {

    private Long id;

    private String productName;

    private Integer quantity;

    private Double price;

    private Double subtotal;

    public OrderItemResponseDto() {
    }

    public Long getId() {
        return id;
    }

    public String getProductName() {
        return productName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Double getPrice() {
        return price;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }
}