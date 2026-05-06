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
    public Cart addToCart(Long userId, Long productId, int quantity) {

        System.out.println("INSIDE SERVICE");


        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUserId(userId);
                    return  newCart;
                });
         
            cart = new Cart();
            cart.setUserId(userId);
           // System.out.println("productId: " + productId);
           // System.out.println("quantity: " + quantity);
        

        // Create new CartItem
        CartItem item = new CartItem();
        item.setProductId(productId);
        item.setQuantity(quantity);
        item.setCart(cart);

        cart.getItems().add(item);

        return cartRepository.save(cart);
    }
}        