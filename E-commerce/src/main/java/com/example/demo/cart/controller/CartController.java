package com.example.demo.cart.controller;

import com.example.demo.cart.dto.CartRequest;
import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.service.CartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.http.StreamingHttpOutputMessage.Body;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;


    @GetMapping("/test")
    public String test() {
        System.out.println("hello world to java developers");
    return "WORKING";
}
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCart(
            @PathVariable Long id,
            @RequestBody Cart cart) {

        Cart updatedCart = cartService.updateCart(id, cart);

        return ResponseEntity.ok(updatedCart);
    }
}