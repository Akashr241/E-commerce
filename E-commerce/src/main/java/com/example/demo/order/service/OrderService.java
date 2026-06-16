package com.example.demo.order.service;

import com.example.demo.order.dto.OrderResponseDto;
import com.example.demo.order.dto.OrderHistoryResponseDto;
import java.util.List;
import com.example.demo.order.dto.UpdateOrderStatusDto;
public interface OrderService {
  OrderResponseDto placeOrder(Long cartId);
List<OrderHistoryResponseDto> getMyOrders();
OrderResponseDto updateOrderStatus(
        Long orderId,
        UpdateOrderStatusDto dto);
  
List<OrderResponseDto> getOrdersByStatus(String status);
OrderResponseDto getOrderById(Long orderId);
List<OrderResponseDto> getAllOrders();
void cancelOrder(Long orderId);
}
