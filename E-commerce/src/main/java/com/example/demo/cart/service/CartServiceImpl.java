package com.example.demo.cart.service;
import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.entity.CartItem;
import com.example.demo.cart.repository.CartRepository;
import com.example.demo.cart.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public Cart updateCart(Long id, Cart updatedCart) {

        Cart existingCart = cartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        existingCart.setProductName(updatedCart.getProductName());
        existingCart.setQuantity(updatedCart.getQuantity());
        existingCart.setPrice(updatedCart.getPrice());

        return cartRepository.save(existingCart);
    }
}
