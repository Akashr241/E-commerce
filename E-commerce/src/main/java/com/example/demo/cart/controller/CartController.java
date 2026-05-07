/* 
package  com.example.demo.cart.controller;
import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;
         @GetMapping("/test")
    public String test() {
        return "Cart API working";
    
    }
    

    @PostMapping("/add")
    public Cart addToCart(@RequestParam Long userId,
                          @RequestParam Long productId,
                          @RequestParam int quantity) {
        System.out.println("API HIT");
        return cartService.addToCart(userId, productId, quantity);

   
    }
}



*/
package com.example.demo.cart.controller;

import com.example.demo.cart.dto.CartRequest;
import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.service.CartService;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.StreamingHttpOutputMessage.Body;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/test")
    public String test() {
        System.out.println("API HIT");
        System.out.println("Inside Service");
        return "Cart API working";
    }

    @PostMapping("/add")
    public Cart addToCart(@RequestBody CartRequest request) {

        System.out.println("controller hit");
        System.out.println( "before  service ");
        System.out.println("RAW BODY: " + request);
       // return request;


        if(request==null){
            System.out.println("Request body is null");
        }
else{
    System.out.println("Received CartRequest:");
        System.out.println("API HIT");
        System.out.println("UserId: " + request.getUserId());
        System.out.println("ProductId: " + request.getProductId());
        System.out.println("Quantity: " + request.getQuantity());
        
}

        return cartService.addToCart(
                request.getUserId(),
                request.getProductId(),
                request.getQuantity()
        );
    }
}



