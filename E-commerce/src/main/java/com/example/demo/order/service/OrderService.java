package com.example.demo.order.service;

import com.example.demo.order.dto.OrderResponseDto;
import com.example.demo.order.dto.OrderHistoryResponseDto;
import java.util.List;
public interface OrderService {
  OrderResponseDto placeOrder(Long cartId);
List<OrderHistoryResponseDto> getMyOrders();
  
}
