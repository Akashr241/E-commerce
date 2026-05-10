package com.example.demo.cart.service;

import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.repository.CartRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    // CREATE
    @Override
    public Cart addToCart(Cart cart) {

        return cartRepository.save(cart);
    }

    // READ
    @Override
    public List<Cart> getAllCartItems() {

        return cartRepository.findAll();
    }

    // UPDATE
    @Override
    public Cart updateCart(Long id, Cart updatedCart) {

        Cart cart = cartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        cart.setProductName(updatedCart.getProductName());
        cart.setQuantity(updatedCart.getQuantity());
        cart.setPrice(updatedCart.getPrice());

        return cartRepository.save(cart);
    }

    // DELETE
    @Override
    public void deleteCart(Long id) {

        cartRepository.deleteById(id);
    }
}