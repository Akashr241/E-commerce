package com.example.demo.cartitem;

import com.example.demo.cart.entity.Cart;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.cart.repository.CartRepository;
import com.example.demo.product.entity.Product;
import com.example.demo.product.repository.ProductRepository;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class CartItemService {
        private final CartItemRepository cartItemRepository;
        private final CartRepository cartRepository;
        private final ProductRepository productRepository;


        public CartItemService(CartItemRepository cartItemRepository, CartRepository cartRepository, ProductRepository productRepository) {
            this.cartItemRepository = cartItemRepository;
            this.cartRepository = cartRepository;
            this.productRepository = productRepository;
        }


    public CartItem addProductToCart(
            Long cartId,
            Long productId,
            int quantity) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Cart not found"));
                                cart.setCartItems(cart.getCartItems());
                                System.out.println(cart.getCartItems().size()+" items in cart");
System.out.println("add product method called");
        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found"));

        double subTotal = quantity * product.getPrice();

Optional<CartItem> existingItem =
        cartItemRepository.findByCartIdAndProductId(cartId, productId);

if (existingItem.isPresent()) {

    CartItem item = existingItem.get();

    item.setQuantity(item.getQuantity() + quantity);

    item.setSubTotal(
            item.getProduct().getPrice() * item.getQuantity());

    return cartItemRepository.save(item);

}


        CartItem cartItem = new CartItem();
        

        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);
        cartItem.setSubTotal(subTotal);
                System.out.println("cart item saving inside database");

                CartItem saved= cartItemRepository.save(cartItem);
                System.out.println("cart item saved with id: " + saved.getId());
        return saved;
    }
}