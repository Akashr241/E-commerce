package com.example.demo.cart.service;
import com.example.demo.cart.dto.CartItemResponseDto;
import com.example.demo.cart.dto.CartResponseDto;
import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.exception.ResourceNotFoundException;
import com.example.demo.cart.repository.CartRepository;
import com.example.demo.cart.dto.CartRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public CartResponseDto addCart(Cart cart) {

    Cart savedCart = cartRepository.save(cart);

    List<CartItemResponseDto> itemDtos =
            savedCart.getCartItems()
                    .stream()
                    .map(item -> new CartItemResponseDto(
                            item.getId(),
                            item.getProductName(),
                            item.getQuantity(),
                            item.getPrice()
                    ))
                    .toList();

    return new CartResponseDto(
            savedCart.getId(),
            savedCart.getTotalPrice(),
            itemDtos
    );
}

    @Override
    public List<Cart> getAllCartItems() {
        return cartRepository.findAll();
    }

    @Override
    public Cart getCartById(Long id) {

        return cartRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Cart item not found with id: " + id));
    }

    @Override
    public Cart updateCart(Long id, Cart cart) {

        Cart existingCart = getCartById(id);

        existingCart.setProductName(cart.getProductName());
        existingCart.setQuantity(cart.getQuantity());
        existingCart.setPrice(cart.getPrice());

        return cartRepository.save(existingCart);
    }

    @Override
    public void deleteCart(Long id) {

        Cart existingCart = getCartById(id);

        cartRepository.delete(existingCart);
    }
}