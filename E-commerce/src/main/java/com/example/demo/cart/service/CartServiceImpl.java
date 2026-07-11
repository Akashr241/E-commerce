package com.example.demo.cart.service;

import com.example.demo.cart.dto.AddProductToCartRequest;
import com.example.demo.cart.dto.CartResponseDto;
import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.mapper.CartMapper;
import com.example.demo.cart.repository.CartRepository;
import com.example.demo.cartitem.CartItem;
import com.example.demo.cartitem.CartItemService;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.product.entity.Product;
import com.example.demo.product.repository.ProductRepository;
import com.example.demo.security.user.entity.User;
import com.example.demo.security.user.repository.UserRepository;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemService cartItemService;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public CartServiceImpl(
            CartRepository cartRepository,
            CartItemService cartItemService,
            UserRepository userRepository,
            ProductRepository productRepository) {

        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    private Cart getCurrentUserCart() {

        User user = getCurrentUser();

        return cartRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });
    }

    @Override
    public CartResponseDto createCart() {

        User user = getCurrentUser();

        if (cartRepository.findByUserId(user.getId()).isPresent()) {
            throw new RuntimeException("Cart already exists");
        }

        Cart cart = new Cart();
        cart.setUser(user);
        

        Cart savedCart = cartRepository.save(cart);

        return CartMapper.mapToCartResponseDto(savedCart);
    }

    @Override
    public CartResponseDto addCart() {

        Cart cart = new Cart();
    

        Cart savedCart = cartRepository.save(cart);

        return CartMapper.mapToCartResponseDto(savedCart);
    }

    @Override
    public CartResponseDto addProductToCart(AddProductToCartRequest request) {

        Cart cart = getCurrentUserCart();

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));

        if (product.getStock() < request.getQuantity()) {
            throw new RuntimeException("Insufficient stock");
        }

        CartItem cartItem = cartItemService.addProductToCart(
                cart.getId(),
                request.getProductId(),
                request.getQuantity());

        cart.getCartItems().add(cartItem);

        updateCartTotal(cart);

        Cart savedCart = cartRepository.save(cart);

        return CartMapper.mapToCartResponseDto(savedCart);
    }

    @Override
    public CartResponseDto updateCartItemQuantity(
            Long cartItemId,
            int quantity) {

        Cart cart = getCurrentUserCart();

        CartItem cartItem = cart.getCartItems()
                .stream()
                .filter(item -> item.getId().equals(cartItemId))
                .findFirst()
                .orElseThrow(() ->
                        new RuntimeException("Cart item not found"));

        cartItem.setQuantity(quantity);

        cartItem.setSubTotal(
                cartItem.getProduct().getPrice() * quantity);

        updateCartTotal(cart);

        Cart savedCart = cartRepository.save(cart);

        return CartMapper.mapToCartResponseDto(savedCart);
    }

    @Override
    public void removeCartItem( Long cartItemId) {

        Cart cart = getCurrentUserCart();

        CartItem cartItem = cart.getCartItems()
                .stream()
                .filter(item -> item.getId().equals(cartItemId))
                .findFirst()
                .orElseThrow(() ->
                        new RuntimeException("Cart item not found"));

        cart.getCartItems().remove(cartItem);

        updateCartTotal(cart);

        cartRepository.save(cart);
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
                                "Cart not found with id : " + id));
    }

    private void updateCartTotal(Cart cart) {

        double total = cart.getCartItems()
                .stream()
                .mapToDouble(CartItem::getSubTotal)
                .sum();

    }
}