package com.example.demo.checkout.dto;
import com.example.demo.cart.dto.CartItemResponseDto;
import java.util.List;

public class CheckoutResponseDto {

    private List<CartItemResponseDto> items;
    private double total;
    private CheckoutRequestDto shippingAddress;

    public CheckoutResponseDto() {
    }

    public List<CartItemResponseDto> getItems() {
        return items;
    }

    public void setItems(List<CartItemResponseDto> items) {
        this.items = items;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public CheckoutRequestDto getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(CheckoutRequestDto shippingAddress) {
        this.shippingAddress = shippingAddress;
    }
}