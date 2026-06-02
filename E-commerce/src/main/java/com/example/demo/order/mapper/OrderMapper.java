package com.example.demo.order.mapper;
import com.example.demo.order.dto.OrderItemResponseDto;
import com.example.demo.order.dto.OrderResponseDto;
import com.example.demo.order.entity.Order;
import com.example.demo.order.entity.OrderItem;
import com.example.demo.order.dto.OrderHistoryResponseDto;
import java.util.List;
import java.util.stream.Collectors;


public class OrderMapper {

    private static OrderItemResponseDto mapToOrderItemDto(OrderItem orderItem) {

        OrderItemResponseDto dto = new OrderItemResponseDto();

        dto.setId(orderItem.getId());
        dto.setProductName(orderItem.getProductName());
        dto.setQuantity(orderItem.getQuantity());
        dto.setPrice(orderItem.getPrice());
        dto.setSubtotal(orderItem.getSubtotal());

        return dto;
    }

    public static OrderResponseDto mapToOrderResponseDto(Order order) {

        OrderResponseDto dto = new OrderResponseDto();

        dto.setId(order.getId());
        dto.setOrderDate(order.getOrderDate());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus().name());

        List<OrderItemResponseDto> itemDtos =
                order.getOrderItems()
                        .stream()
                        .map(OrderMapper::mapToOrderItemDto)
                        .collect(Collectors.toList());

        dto.setOrderItems(itemDtos);

        return dto;
    }

   public static OrderHistoryResponseDto mapToOrderHistoryDto(Order order){

    OrderHistoryResponseDto dto =
            new OrderHistoryResponseDto();

    dto.setId(order.getId());
    dto.setTotalPrice(order.getTotalAmount());
    dto.setStatus(order.getStatus().name());

    return dto;
} 
}
