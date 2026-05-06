
package com.example.demo.cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.cart.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
