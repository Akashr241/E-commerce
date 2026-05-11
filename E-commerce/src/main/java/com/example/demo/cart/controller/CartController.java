package com.example.demo.cart.controller;

import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.service.CartService;
import com.example.demo.cart.dto.CartRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // CREATE
    @PostMapping
    public Cart addToCart(@Valid @RequestBody CartRequest request) {
        Cart cart = new Cart();
        cart.setProductName(request.getProductName());
        cart.setQuantity(request.getQuantity());
        cart.setPrice(request.getPrice());

        return cartService.addToCart(cart);
    }

    // READ
    @GetMapping("/{id}")
    public Cart getCart(@PathVariable Long id) {
    return cartService.getCartById(id);
}

    // UPDATE
    @PutMapping("/{id}")
    public Cart updateCart(
            @PathVariable Long id,
            @RequestBody Cart cart) {

        return cartService.updateCart(id, cart);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteCart(@PathVariable Long id) {

        cartService.deleteCart(id);

        return "Cart item deleted successfully";
    }
}