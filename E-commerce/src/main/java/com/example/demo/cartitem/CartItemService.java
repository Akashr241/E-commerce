package com.example.demo.cartitem;

import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.exception.ResourceNotFoundException;
import com.example.demo.cart.repository.CartRepository;
import com.example.demo.product.entity.Product;
import com.example.demo.product.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    public CartItem addProductToCart(
            Long cartId,
            Long productId,
            int quantity) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Cart not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found"));

        double subTotal = quantity * product.getPrice();

        CartItem cartItem = new CartItem();

        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);
        cartItem.setSubTotal(subTotal);

        return cartItemRepository.save(cartItem);
    }
}