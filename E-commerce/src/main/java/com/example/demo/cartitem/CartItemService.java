package com.example.demo.cartitem;

import com.example.demo.cart.entity.Cart;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.cart.repository.CartRepository;
import com.example.demo.product.entity.Product;
import com.example.demo.product.repository.ProductRepository;
import com.example.demo.security.user.entity.User;
import com.example.demo.security.user.repository.UserRepository;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class CartItemService {

    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;


    public CartItemService(
            CartItemRepository cartItemRepository,
            CartRepository cartRepository,
            ProductRepository productRepository,
            UserRepository userRepository
    ) {

        this.cartItemRepository = cartItemRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;

    }


    // ==========================================
    // ADD PRODUCT TO CART
    // ==========================================

    public CartItem addProductToCart(
            Long cartId,
            Long productId,
            int quantity
    ) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Cart not found"
                        )
                );

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found"
                        )
                );

        double subTotal =
                quantity * product.getPrice();


        Optional<CartItem> existingItem =
                cartItemRepository.findByCartIdAndProductId(
                        cartId,
                        productId
                );


        if (existingItem.isPresent()) {

            CartItem item =
                    existingItem.get();

            item.setQuantity(
                    item.getQuantity() + quantity
            );

            item.setSubTotal(
                    item.getProduct().getPrice()
                            * item.getQuantity()
            );

            return cartItemRepository.save(item);
        }


        CartItem cartItem =
                new CartItem();

        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);
        cartItem.setSubTotal(subTotal);

        return cartItemRepository.save(cartItem);
    }


    // ==========================================
    // REMOVE PRODUCT FROM CART
    // ==========================================

    public void removeCartItem(Long cartItemId) {

        // 1. FIND CART ITEM

        CartItem cartItem =
                cartItemRepository.findById(cartItemId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Cart item not found"
                                )
                        );


        // 2. GET LOGGED-IN USER

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();


        // 3. FIND USER

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found"
                                )
                        );


        // 4. GET CART

        Cart cart =
                cartItem.getCart();


        // 5. CHECK CART BELONGS TO USER

        if (
                cart.getUser() == null ||
                !cart.getUser().getId()
                        .equals(user.getId())
        ) {

            throw new RuntimeException(
                    "You cannot remove another user's cart item"
            );

        }

    cart.removeCartItem(cartItem);

        // 6. DELETE ONLY CART ITEM

        cartRepository.save(cart);


        System.out.println(
                "================================"
        );

        System.out.println(
                "CART ITEM DELETED SUCCESSFULLY"
        );

        System.out.println(
                "Cart Item ID: "
                        + cartItemId
        );

        System.out.println(
                "================================"
        );
    }
}