package com.example.demo.cart.service;
import com.example.demo.cart.dto.CartResponseDto;
import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.dto.AddProductToCartRequest;

import java.util.List;

public interface CartService {


    CartResponseDto createCart();

    CartResponseDto addCart();

    CartResponseDto addProductToCart(AddProductToCartRequest request);

    CartResponseDto updateCartItemQuantity(
            Long cartItemId,
            int quantity);

    void removeCartItem(
            Long cartItemId);

    List<Cart> getAllCartItems();

    Cart getCartById(Long id);
    
        CartResponseDto getCurrentUserCartDto();

}
