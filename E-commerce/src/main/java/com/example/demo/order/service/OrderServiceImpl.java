package com.example.demo.order.service;
import com.example.demo.order.dto.OrderResponseDto;
import com.example.demo.order.repository.OrderRepository;
import com.example.demo.order.service.OrderService;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public OrderResponseDto placeOrder(Long cartId) {

        OrderResponseDto dto = new OrderResponseDto();

        dto.setId(1L);
        dto.setStatus("PLACED");
        dto.setTotalAmount(255000.0);

        return dto;
    }
}