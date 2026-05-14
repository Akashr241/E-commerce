package com.example.demo.cart.mapper;

import com.example.demo.cart.dto.CartRequestDto;
import com.example.demo.cart.dto.CartResponseDto;
import com.example.demo.cart.entity.Cart;

public class CartMapper {

    // RequestDto -> Entity
    public static Cart mapToCart(CartRequestDto dto) {

        Cart cart = new Cart();

        cart.setProductName(dto.getProductName());
        cart.setQuantity(dto.getQuantity());
        cart.setPrice(dto.getPrice());

        return cart;
    }

    // Entity -> ResponseDto
    public static CartResponseDto mapToCartResponseDto(Cart cart) {

        return new CartResponseDto(
                cart.getId(),
                cart.getProductName(),
                cart.getQuantity(),
                cart.getPrice()
        );
    }
}