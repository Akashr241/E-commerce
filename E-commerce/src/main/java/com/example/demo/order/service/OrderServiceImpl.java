package com.example.demo.order.service;
import com.example.demo.order.dto.OrderResponseDto;
import com.example.demo.order.entity.Order;
import com.example.demo.order.mapper.OrderMapper;
import com.example.demo.order.repository.OrderRepository;
import com.example.demo.order.service.OrderService;
import java.util.ArrayList;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;
import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.repository.CartRepository;
import com.example.demo.order.entity.OrderItem;
//import com.example.demo.cart.entity.Cart;
import com.example.demo.product.entity.Product;
import com.example.demo.cartitem.CartItem;
import org.springframework.transaction.annotation.Transactional;
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
    @Transactional
    @Override
    public OrderResponseDto placeOrder(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found with id: "));
        Order order = new Order();
        order.setOrderDate(LocalDateTime.now());
        OrderResponseDto dto =new OrderResponseDto();
        order.setStatus("PLACED");
                order.setTotalAmount(cart.getTotalPrice());

        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cart.getCartItems()) {
            Product product = cartItem.getProduct();
            if(product.getStock() < cartItem.getQuantity()) {
                throw new RuntimeException("Product " + product.getName() + " is out of stock.");
            }
            product.setStock(product.getStock() - cartItem.getQuantity());


            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setProductName(cartItem.getProduct().getName());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProduct().getPrice());
            orderItem.setSubtotal(cartItem.getSubTotal());
            orderItem.setOrder(order);
            orderItems.add(orderItem);
            order.setOrderItems(orderItems);
            
        }
        order.setOrderItems(orderItems);
        Order savedOrder = orderRepository.save(order);

        return OrderMapper.mapToOrderResponseDto(savedOrder);
    }
    

}