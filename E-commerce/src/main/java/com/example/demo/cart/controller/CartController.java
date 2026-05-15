package com.example.demo.cart.controller;

import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.service.CartService;
//import com.example.demo.cart.dto.CartResponseDto;
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
    @PutMapping("/{cartId}/items/{cartItemId}")
    public ResponseEntity<CartResponseDto> updateCartItemQuantity(
            @PathVariable Long cartId,
            @PathVariable Long cartItemId,
            @RequestParam int quantity) {
                CartResponseDto response = cartService.updateCartItemQuantity(cartId, cartItemId, quantity);
        return ResponseEntity.ok(response);

    }

    // DELETE
    @DeleteMapping("/{cartId}/items/{cartItemId}")
    public ResponseEntity<String> removeCartItem(
            @PathVariable Long cartId,
            @PathVariable Long cartItemId) {

        cartService.removeCartItem(cartId, cartItemId);

        return ResponseEntity.ok("item removed successfully");
    }
}