package com.example.demo.cart.service;

import com.example.demo.cart.dto.AddProductToCartRequest;
import com.example.demo.cart.dto.CartResponseDto;
import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.exception.ResourceNotFoundException;
import com.example.demo.cart.mapper.CartMapper;
import com.example.demo.cart.repository.CartRepository;
import com.example.demo.cartitem.CartItem;
import com.example.demo.cartitem.CartItemService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemService cartItemService;

    @Override
    public CartResponseDto addProductToCart(
            AddProductToCartRequest request) {

        Cart cart = cartRepository.findById(request.getCartId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Cart not found"));

        CartItem cartItem =
                cartItemService.addProductToCart(
                        request.getCartId(),
                        request.getProductId(),
                        request.getQuantity());

        cart.getCartItems().add(cartItem);

        double total =
                cart.getCartItems()
                        .stream()
                        .mapToDouble(CartItem::getSubTotal)
                        .sum();

        cart.setTotalPrice(total);

        cartRepository.save(cart);

        return CartMapper.mapToCartResponseDto(cart);
    }

    @Override
    public CartResponseDto addCart() {

        Cart cart = new Cart();

        cart.setTotalPrice(0);

        Cart savedCart = cartRepository.save(cart);

        return CartMapper.mapToCartResponseDto(savedCart);
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
                                "Cart not found with id: " + id));
    }

    @Override
    public Cart updateCart(Long id, Cart cart) {

        Cart existingCart = getCartById(id);

        existingCart.setTotalPrice(cart.getTotalPrice());

        return cartRepository.save(existingCart);
    }

    @Override
    public void deleteCart(Long id) {

        Cart existingCart = getCartById(id);

        cartRepository.delete(existingCart);
    }
}