package com.example.demo.cart.service;

import com.example.demo.cart.dto.AddProductToCartRequest;
import com.example.demo.cart.dto.CartResponseDto;
import com.example.demo.cart.entity.Cart;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.cart.mapper.CartMapper;
import com.example.demo.cart.repository.CartRepository;
import com.example.demo.cartitem.CartItem;
import com.example.demo.cartitem.CartItemService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
 import com.example.demo.security.user.entity.User;
import com.example.demo.security.user.repository.UserRepository;
import com.example.demo.product.repository.ProductRepository;
import com.example.demo.product.entity.Product;
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
    

    @Override
    public CartResponseDto addProductToCart(
            AddProductToCartRequest request) {

        Cart cart = cartRepository.findById(request.getCartId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "user not found"));

        CartItem cartItem =
                cartItemService.addProductToCart(
                        cart.getId(),
                        request.getProductId(),
                        request.getQuantity());


             Product product = productRepository
        .findById(request.getProductId())
        .orElseThrow(() ->
                new RuntimeException("Product not found"));

System.out.println(product.getStock());

System.out.println("Quantity: " + request.getQuantity());

if(product.getStock() < request.getQuantity()) {
    throw new RuntimeException("Insufficient stock");
}           

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
public CartResponseDto updateCartItemQuantity (
        Long cartItemId,
        int quantity) {
        String email = SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getName();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException("User not found"));


    Cart cart = cartRepository.findByUserId(user.getId())
            .orElseThrow(() ->
                    new RuntimeException("Cart not found"));

    CartItem cartItem = cart.getCartItems()
            .stream()
            .filter(item -> item.getId().equals(cartItemId))
            .findFirst()
            .orElseThrow(() ->
                    new RuntimeException("Cart item with id " + cartItemId + " not found in cart"));

    cartItem.setQuantity(quantity);

    double subTotal =
            cartItem.getProduct().getPrice() * quantity;

    cartItem.setSubTotal(subTotal);
  updateCartTotal(cart);
    
    Cart savedCart = cartRepository.save(cart);

    return CartMapper.mapToCartResponseDto(savedCart);
}

    

    @Override
public void removeCartItem( Long cartItemId) {
         String email = SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getName();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException("User not found"));


    Cart cart = cartRepository.findByUserId(user.getId())
            .orElseThrow(() ->
                    new RuntimeException("Cart not found"));

    CartItem cartItem = cart.getCartItems()
            .stream()
            .filter(item -> item.getId().equals(cartItemId))
            .findFirst()
            .orElseThrow(() ->
                    new RuntimeException("Cart item not found"));

    cart.getCartItems().remove(cartItem);

    double total = cart.getCartItems()
            .stream()
            .mapToDouble(CartItem::getSubTotal)
            .sum();

    cart.setTotalPrice(total);

    cartRepository.save(cart);
}
private void updateCartTotal(Cart cart) {

    double total = cart.getCartItems()
            .stream()
            .mapToDouble(CartItem::getSubTotal)
            .sum();

    cart.setTotalPrice(total);
}
@Override
public CartResponseDto createCart() {

    String email = SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getName();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException("User not found"));

    Cart cart = new Cart();

    cart.setUser(user);

    cart.setTotalPrice(0.0);

    Cart savedCart = cartRepository.save(user.getId());

    return CartMapper
            .mapToCartResponseDto(savedCart);
}

    }
