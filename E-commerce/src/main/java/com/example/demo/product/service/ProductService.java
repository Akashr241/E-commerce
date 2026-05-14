package com.example.demo.product.service;

import com.example.demo.product.dto.ProductRequestDto;
import com.example.demo.product.dto.ProductResponseDto;

import java.util.List;

public interface ProductService {

    ProductResponseDto addProduct(ProductRequestDto dto);

    List<ProductResponseDto> getAllProducts();

    ProductResponseDto getProductById(Long id);

    ProductResponseDto updateProduct(
            Long id,
            ProductRequestDto dto);

    void deleteProduct(Long id);
}