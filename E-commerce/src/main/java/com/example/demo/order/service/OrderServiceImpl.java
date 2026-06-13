package com.example.demo.order.service;
import com.example.demo.order.dto.OrderResponseDto;
import com.example.demo.order.dto.UpdateOrderStatusDto;
import com.example.demo.order.entity.Order;
import com.example.demo.order.mapper.OrderMapper;
import com.example.demo.order.repository.OrderRepository;
import java.util.ArrayList;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.repository.CartRepository;
import com.example.demo.order.entity.OrderItem;
import com.example.demo.product.entity.Product;
import com.example.demo.cartitem.CartItem;
import com.example.demo.exception.OrderNotFoundException;

import org.springframework.transaction.annotation.Transactional;
import com.example.demo.product.repository.ProductRepository;
import com.example.demo.order.dto.OrderHistoryResponseDto;
import com.example.demo.security.user.repository.UserRepository;
import com.example.demo.security.user.entity.User;
import org.springframework.security.core.Authentication;
import com.example.demo.order.entity.OrderStatus;
import com.example.demo.order.dto.UpdateOrderStatusDto;
@Service
public class OrderServiceImpl implements OrderService {


    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    public OrderServiceImpl(OrderRepository orderRepository,
                            CartRepository cartRepository,
                            ProductRepository productRepository,
                            UserRepository userRepository
    ) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }
    @Transactional
    @Override
    public OrderResponseDto placeOrder(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found with id: "));
                if(cart.getCartItems().isEmpty()) {
                    throw new RuntimeException("Cart is empty. Cannot place order.");
                }
        Order order = new Order();
        order.setOrderDate(LocalDateTime.now());
       // OrderResponseDto dto =new OrderResponseDto();
        order.setStatus(OrderStatus.PLACED);
                order.setTotalAmount(cart.getTotalPrice());

        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cart.getCartItems()) {
            System.out.println("loop was running");
            Product product = cartItem.getProduct();
            System.out.println("Old stock " + product.getStock());

            if(product.getStock() < cartItem.getQuantity()) {
                throw new RuntimeException("Product " + product.getName() + " is out of stock.");
            }
            System.out.println("quantity:  " + cartItem.getQuantity());
            product.setStock(product.getStock() - cartItem.getQuantity());
            System.out.println("new stock " +product.getStock());

            productRepository.save(product);

            OrderItem orderItem = new OrderItem();
           // orderItem.setProduct(cartItem.getProduct());
            orderItem.setProductName(product.getName());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(product.getPrice());
            orderItem.setSubtotal(cartItem.getSubTotal());
            orderItem.setOrder(order);
            //set order item
            orderItems.add(orderItem);
            //save order item
            order.setOrderItems(orderItems);
            
        }
        order.setOrderItems(orderItems);
        Order savedOrder = orderRepository.save(order);
        cart.getCartItems().clear();
        cart.setTotalPrice(0.0);
        cartRepository.save(cart);

        return OrderMapper.mapToOrderResponseDto(savedOrder);
    }
    
@Override
public List<OrderHistoryResponseDto> getMyOrders() {

    Authentication authentication =
            SecurityContextHolder.getContext().getAuthentication();

    String email = authentication.getName();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException("User not found"));

    List<Order> orders =
            orderRepository.findByUser(user);

    return orders.stream()
            .map(OrderMapper::mapToOrderHistoryDto)
            .toList();
}
@Override
public OrderResponseDto updateOrderStatus(
        Long orderId,
        UpdateOrderStatusDto dto) {

    Order order = orderRepository.findById(orderId)
            .orElseThrow(() ->
                    new OrderNotFoundException(
                            "Order not found"));

    order.setStatus(dto.getStatus());

    orderRepository.save(order);

    return OrderMapper.toDto(order);
}

}