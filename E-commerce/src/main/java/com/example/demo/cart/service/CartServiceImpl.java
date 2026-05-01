
package com.example.demo.cart.service;
import  com.example.demo.cart.enity.Cart;
import com.example.demo.cart.enity.CartItem;
import com.example.demo.cart.repository.CartRepository;
//import  sun.tools.serialver.resources.serialver_de;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public Cart addToCart(Long userId, Long productId, int quantity) {

        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUserId(userId);
                    return newCart;
                });

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(
                existingItem.get().getQuantity() + quantity
            );
        } else {
            CartItem newItem = new CartItem();
            newItem.setProductId(productId);
            newItem.setQuantity(quantity);
            newItem.setCart(cart);
            cart.getItems().add(newItem);
        }

        return cartRepository.save(cart);
    }
}