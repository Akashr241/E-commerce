package com.example.demo.checkout.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.example.demo.security.user.repository.UserRepository;
import com.example.demo.cart.dto.CartItemResponseDto;
import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.repository.CartRepository;
import com.example.demo.checkout.dto.CheckoutRequestDto;
import com.example.demo.checkout.dto.CheckoutResponseDto;
import com.example.demo.security.user.entity.User;
import com.example.demo.security.user.repository.UserRepository;
@Service
public class CheckoutServiceImpl implements CheckoutService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserRepository userRepository;
    
 
    @Override
    public CheckoutResponseDto checkout(CheckoutRequestDto request) {



       String email = SecurityContextHolder
        .getContext()
        .getAuthentication()
        .getName();

User user = userRepository.findByEmail(email)
        .orElseThrow(() ->
                new RuntimeException("User not found"));


        Cart cart = cartRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        List<CartItemResponseDto> items = cart.getCartItems()
                .stream()
                .map(item -> 
                     new CartItemResponseDto(;
                    item.getId();
                    item.getProduct().getName();
                    item.getSubTotal();
                    item.getQuantity();
                
                ))
                .toList();

        double total = cart.getCartItems()
                .stream()
                .mapToDouble(item ->
                        item.getProduct().getPrice() * item.getQuantity())
                .sum();

        CheckoutResponseDto response = new CheckoutResponseDto();

        response.setItems(items);
        response.setTotal(total);
        response.setShippingAddress(request);

        return response;
    }
}