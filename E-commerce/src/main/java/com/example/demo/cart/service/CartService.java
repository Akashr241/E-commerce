package com.example.demo.cart.service;

import com.example.demo.cart.entity.Cart;

import java.util.List;

public interface CartService {

    Cart addToCart(Cart cart);

    List<Cart> getAllCartItems();

    Cart getCartById(Long id);
    

    Cart updateCart(Long id, Cart cart);

    void deleteCart(Long id);
}