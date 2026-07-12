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
                                item.getProduct().getPrice(),
                                item.getQuantity(),
                                item.getSubTotal()
                        ))
                        .toList();


        double total = cart.getCartItems()
                .stream()
                .mapToDouble(item -> item.getSubTotal())
                .sum();

        return new CartResponseDto(
                cart.getId(),
                total,
                itemDtos
        
        );
    }
}