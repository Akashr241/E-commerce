package com.example.demo.cart.controller;

import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.service.CartService;
//import com.example.demo.cart.dto.CartResponseDto;
import jakarta.validation.Valid;
import com.example.demo.cart.dto.AddProductToCartRequest;
import com.example.demo.cart.dto.CartResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<CartResponseDto> addCart() {
        return new ResponseEntity <>(
                cartService.addCart(),
                HttpStatus.CREATED
                
        );
    }
 
    // CREATE
    @PostMapping("/add-product")
    public ResponseEntity<CartResponseDto> addProductToCart(
             @RequestBody AddProductToCartRequest request) {

        return new ResponseEntity<>(
                cartService.addProductToCart(request),
            HttpStatus.CREATED
    );
}

    
    @GetMapping("/all")
    public List<Cart> getAllCartItems() {
        return cartService.getAllCartItems();
    }

    // READ
    @GetMapping("/get/{id}")
    public Cart getCart(@PathVariable Long id) {
    return cartService.getCartById(id);
}

    // UPDATE
    @PutMapping("/update/{id}")
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