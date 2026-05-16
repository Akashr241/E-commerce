package com.example.demo.order.service;

import com.example.demo.order.dto.OrderResponseDto;

public interface OrderService {
  OrderResponseDto placeOrder(Long cartId);

  
}
