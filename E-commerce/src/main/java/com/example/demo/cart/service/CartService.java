package com.example.demo.cart.service;
import com.example.demo.cart.dto.CartResponseDto;
import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.dto.AddProductToCartRequest;

import java.util.List;

public interface CartService {
    CartResponseDto addCart();

    CartResponseDto addProductToCart(AddProductToCartRequest request);

    List<Cart> getAllCartItems();
    CartResponseDto createCart();

    Cart getCartById(Long id);
    

    CartResponseDto updateCartItemQuantity(Long cartId,
        Long cartItemId,int quantity);

    void removeCartItem(Long cartId, Long cartItemId);
}