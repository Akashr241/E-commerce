package com.example.demo.order.controller;

import com.example.demo.order.dto.OrderResponseDto;
import com.example.demo.order.service.OrderService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.order.dto.OrderHistoryResponseDto;
@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
   

   @PostMapping("/place/{cartId}")
public OrderResponseDto placeOrder(@PathVariable Long cartId) {
    return orderService.placeOrder(cartId);
} 
 @GetMapping("/my-orders")
    public ResponseEntity<List<OrderHistoryResponseDto>> getMyOrders() {
        List<OrderHistoryResponseDto> orders = orderService.getMyOrders();
        return ResponseEntity.ok(orders);
    }
}