package com.example.demo.order.service;
import com.example.demo.order.dto.OrderResponseDto;
import com.example.demo.order.entity.Order;
import com.example.demo.order.mapper.OrderMapper;
import com.example.demo.order.repository.OrderRepository;
import com.example.demo.order.service.OrderService;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.repository.CartRepository;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;

    public OrderServiceImpl(OrderRepository orderRepository,
                            CartRepository cartRepository
    ) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
    }

    @Override
    public OrderResponseDto placeOrder(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found with id: "));
        Order order = new Order();
        order.setOrderDate(LocalDateTime.now());
        OrderResponseDto dto =new OrderResponseDto();
        dto.setStatus("PLACED");
        Order savedOrder = orderRepository.save(order);

        return OrderMapper.mapToOrderResponseDto(savedOrder);
    }
}