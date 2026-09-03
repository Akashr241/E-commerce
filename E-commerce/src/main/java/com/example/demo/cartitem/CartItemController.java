package com.example.demo.cartitem;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/cart")
public class CartItemController {

    private final CartItemService cartItemService;


    public CartItemController(
            CartItemService cartItemService
    ) {
        this.cartItemService = cartItemService;
    }


    // ==========================================
    // REMOVE CART ITEM
    // ==========================================

    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<String> removeCartItem(
            @PathVariable Long cartItemId
    ) {

        System.out.println(
                "========== REMOVE CART ITEM API =========="
        );

        System.out.println(
                "Cart Item ID: " + cartItemId
        );


        cartItemService.removeCartItem(
                cartItemId
        );


        return ResponseEntity.ok(
                "Cart item removed successfully"
        );
    }
}