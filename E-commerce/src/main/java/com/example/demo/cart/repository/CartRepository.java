package com.example.demo.cart.repository;
import com.example.demo.cart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CartRepository extends JpaRepository<Cart, Long> {
   
   // Optional<Cart> findByUserId(Long userId);
}
