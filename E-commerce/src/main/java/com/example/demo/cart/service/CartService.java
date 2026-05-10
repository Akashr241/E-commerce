
package com.example.demo.cart.service;
import com.example.demo.cart.entity.Cart;
import java.util.List;
//import com.example.demo.cart.enity.CartItem;

public interface CartService {

        Cart addToCart(Cart cart);

    List<Cart> getAllCartItems();

    Cart updateCart(Long id, Cart updatedCart);

    void deleteCart(Long id);
}

