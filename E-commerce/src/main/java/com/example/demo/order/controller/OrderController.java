package com.example.demo.order.controller;

import com.example.demo.order.dto.OrderResponseDto;
import com.example.demo.order.dto.UpdateOrderStatusDto;
import com.example.demo.order.service.OrderService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.order.dto.OrderHistoryResponseDto;
import org.springframework.web.bind.annotation.RequestBody;

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
   @PostMapping("/place/")
public OrderResponseDto placeOrder() {
    return orderService.placeOrder();
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
@GetMapping("/status")
public ResponseEntity<List<OrderResponseDto>> getOrdersByStatus(
        @RequestParam String status) {

    return ResponseEntity.ok(orderService.getOrdersByStatus(status));
}
@GetMapping("/{orderId}")
public ResponseEntity<OrderResponseDto> getOrderById(
        @PathVariable Long orderId) {

    return ResponseEntity.ok(
            orderService.getOrderById(orderId));
}
@GetMapping
public ResponseEntity<List<OrderResponseDto>> getAllOrders() {

    return ResponseEntity.ok(
            orderService.getAllOrders());
}


@PutMapping("/{orderId}/cancel")
public ResponseEntity<String> cancelOrder(
        @PathVariable Long orderId) {

    orderService.cancelOrder(orderId);

    return ResponseEntity.ok("Order cancelled");
}

}