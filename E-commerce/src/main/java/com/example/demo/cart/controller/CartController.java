package com.example.demo.cart.controller;

import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.service.CartService;

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
    public Cart addToCart(@RequestBody Cart cart) {

        return cartService.addToCart(cart);
    }

    // READ
    @GetMapping
    public List<Cart> getAllCartItems() {

        System.out.println("Fetching all cart items");

        return cartService.getAllCartItems();
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