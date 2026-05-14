package com.example.demo.cart.service;
import com.example.demo.cart.dto.CartResponseDto;
import com.example.demo.cart.entity.Cart;
import com.example.demo.cart.exception.ResourceNotFoundException;
import com.example.demo.cart.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.cart.dto.CartRequestDto;
import com.example.demo.cart.mapper.CartMapper;
import java.util.List;
import com.example.demo.cart.dto.AddProductToCartRequest;
import com.example.demo.cart.entity.CartItem;
import com.example.demo.cart.repository.CartItemRepository;
import com.example.demo.product.entity.Product;
import com.example.demo.product.repository.ProductRepository;
import com.example.demo.product.service.ProductService;
@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    
@Override 
public CartResponseDto addProductToCart(
        AddProductToCartRequest request) {

    Cart cart = cartRepository.findById(request.getCartId())
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Cart not found"));

    Product product = productRepository
            .findById(request.getProductId())
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Product not found"));

    CartItem cartItem = new CartItem();

    cartItem.setCart(cart);
    cartItem.setProduct(product);
    cartItem.setQuantity(request.getQuantity());

    double subtotal =
            product.getPrice() * request.getQuantity();

    cartItem.setSubTotal(subtotal);

    cartItemRepository.save(cartItem);

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

    return CartMapper
            .mapToCartResponseDto(savedCart);
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
        return cartRepository.findById(id)
        .orElseThrow(() ->
                new ResourceNotFoundException(
                        "Cart item not found with id: " + id));
    }

    @Override
    public void deleteCart(Long id) {

        Cart existingCart = getCartById(id);

        cartRepository.delete(existingCart);
    }
}