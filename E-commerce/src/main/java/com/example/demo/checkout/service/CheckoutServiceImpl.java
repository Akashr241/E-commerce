package com.example.demo.checkout.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.security.user.repository.UserRepository;
import com.example.demo.cart.dto.CartItemResponseDto;
import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.repository.CartRepository;
import com.example.demo.checkout.dto.CheckoutRequestDto;
import com.example.demo.checkout.dto.CheckoutResponseDto;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    @Autowired
    private CartRepository cartRepository;
    
 
    @Override
    public CheckoutResponseDto checkout(CheckoutRequestDto request) {

        // Replace this with the logged-in user's cart
        Long userId = 1L;

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        List<CartItemResponseDto> items = cart.getItems()
                .stream()
                .map(item -> {
                    CartItemResponseDto dto = new CartItemResponseDto();
                    dto.setProductId(item.getProduct().getId());
                    dto.setProductName(item.getProduct().getName());
                    dto.setPrice(item.getProduct().getPrice());
                    dto.setQuantity(item.getQuantity());
                    return dto;
                })
                .toList();

        double total = cart.getItems()
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