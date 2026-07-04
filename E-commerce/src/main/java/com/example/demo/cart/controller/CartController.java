package com.example.demo.cart.controller;

import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.service.CartService;

import com.example.demo.cart.dto.AddProductToCartRequest;
import com.example.demo.cart.dto.CartResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import java.util.List;

@RestController
@RequestMapping("/cart")
@SecurityRequirement(name = "bearerAuth")
public class CartController {


private final CartService cartService;
public CartController(CartService cartService) {
        this.cartService = cartService;
    }

 @PostMapping("/create")
    public ResponseEntity<CartResponseDto> createCart() {

    return ResponseEntity.status(HttpStatus.CREATED)
            .body(cartService.createCart());
    }

    // Add product to logged-in user's cart
    @PostMapping("/add-product")
    public ResponseEntity<CartResponseDto> addProductToCart(
            @RequestBody AddProductToCartRequest request) {

        return new ResponseEntity<>(
                cartService.addProductToCart(request),
                HttpStatus.CREATED);
    }

    // Get all carts (Admin/testing)
    @GetMapping("/all")
    public ResponseEntity<List<Cart>> getAllCartItems() {

        return ResponseEntity.ok(
                cartService.getAllCartItems());
    }

    // Get cart by id
    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCart(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                cartService.getCartById(id));
    }

    // Update quantity
    @PutMapping("/items/{cartItemId}")
    public ResponseEntity<CartResponseDto> updateCartItemQuantity(
            @PathVariable Long cartItemId,
            @RequestParam int quantity) {

       

        return ResponseEntity.ok(cartService.updateCartItemQuantity(
                cartItemId,
                quantity));
    }

    // Remove item
    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<String> removeCartItem(
            @PathVariable Long cartItemId) {

        cartService.removeCartItem(cartItemId);

        return ResponseEntity.ok("Item removed successfully");
    }
}