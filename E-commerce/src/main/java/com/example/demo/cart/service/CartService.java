package com.example.demo.cart.service;
import com.example.demo.cart.dto.CartResponseDto;
import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.dto.AddProductToCartRequest;

import java.util.List;

public interface CartService {
    CartResponseDto addCart();

    CartResponseDto addProductToCart(AddProductToCartRequest request);

    List<Cart> getAllCartItems();

    Cart getCartById(Long id);
    

    Cart updateCart(Long id, Cart cart);

    void deleteCart(Long id);
}