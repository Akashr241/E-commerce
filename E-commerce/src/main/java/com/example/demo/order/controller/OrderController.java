package com.example.demo.order.controller;

import com.example.demo.order.dto.OrderResponseDto;
import com.example.demo.order.dto.UpdateOrderStatusDto;
import com.example.demo.order.service.OrderService;
import java.util.List;

import org.springframework.data.domain.jaxb.SpringDataJaxb.OrderDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.order.dto.OrderHistoryResponseDto;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
   
    @Tag(name="Orders",description="add the order")
    @Operation(summary="Place an order based on the cart ID")
   @PostMapping("/place/{cartId}")
public OrderResponseDto placeOrder(@PathVariable Long cartId) {
    return orderService.placeOrder(cartId);
} 
 @GetMapping("/my-orders")
    public ResponseEntity<List<OrderHistoryResponseDto>> getMyOrders() {
        List<OrderHistoryResponseDto> orders = orderService.getMyOrders();
        return ResponseEntity.ok(orders);
    }
@PutMapping("/{orderId}/status")
public OrderResponseDto updateStatus(
        @PathVariable Long orderId,
        @RequestBody UpdateOrderStatusDto dto) {

    return orderService.updateOrderStatus(
            orderId,
            dto);
}
@GetMapping("/orders/status")
public ResponseEntity<List<OrderResponseDto>> getOrdersByStatus(
        @RequestParam String status) {

    return ResponseEntity.ok(orderService.getOrdersByStatus(status));
}
}