package com.example.demo.cart.mapper;

import com.example.demo.cart.dto.CartItemResponseDto;
import com.example.demo.cart.dto.CartResponseDto;
import com.example.demo.cart.entity.Cart;

import java.util.List;

public class CartMapper {

    public static CartResponseDto
    mapToCartResponseDto(Cart cart) {

        List<CartItemResponseDto> itemDtos =
                cart.getCartItems()
                        .stream()
                        .map(item -> new CartItemResponseDto(
                                item.getId(),
                                item.getProduct().getName(),
                                item.getQuantity(),
                                item.getSubTotal()
                        ))
                        .toList();

        return new CartResponseDto(
                cart.getId(),
                cart.getTotalPrice(),
                itemDtos
        );
    }
}