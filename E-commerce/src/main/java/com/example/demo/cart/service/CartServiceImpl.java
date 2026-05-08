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



                   for (CartItem item : cart.getItems()) {
        if (item.getProductId().equals(productId)) {
            // ✅ update quantity
            item.setQuantity(item.getQuantity() + quantity);
            return cartRepository.save(cart);
        }
    }

    // ✅ If not exists → create new item
    CartItem newItem = new CartItem();
    newItem.setProductId(productId);
    newItem.setQuantity(quantity);
    newItem.setCart(cart);

    cart.getItems().add(newItem);

    return cartRepository.save(cart);
    }
}        