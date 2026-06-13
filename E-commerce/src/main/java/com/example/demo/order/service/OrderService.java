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
  //void updateOrderStatus(Long orderId, UpdateOrderStatusDto updateOrderStatusDto);
}
