package com.example.demo.product.controller;
import com.example.demo.product.dto.ProductRequestDto;
import com.example.demo.product.dto.ProductResponseDto;
import com.example.demo.product.service.ProductService;

import jakarta.validation.Valid;
import com.example.demo.product.service.ProductExcelImportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import java.util.List;
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/products")
public class ProductController {

    
private final ProductService productService;
private final ProductExcelImportService productExcelImportService;
public ProductController(ProductService productService, ProductExcelImportService productExcelImportService) {
        this.productService = productService;
        this.productExcelImportService = productExcelImportService;
}

    @PostMapping
    public ResponseEntity<ProductResponseDto> addProduct(
            @Valid @RequestBody ProductRequestDto dto) {
                System.out.println("product was added");

        return new ResponseEntity<>(
                productService.addProduct(dto),
                HttpStatus.CREATED
        );
    }


@PostMapping("/import")
public ResponseEntity<String> importProducts() {

    int count = productExcelImportService.importProducts();

    return ResponseEntity.ok(
            count + " products imported successfully"
    );
}


    @GetMapping
    public ResponseEntity<List<ProductResponseDto>>
    getAllProducts() {

        return ResponseEntity.ok(
                productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDto>
    getProductById(@PathVariable Long id) {

        return ResponseEntity.ok(
                productService.getProductById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDto>
    updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequestDto dto) {

        return ResponseEntity.ok(
                productService.updateProduct(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteProduct(@PathVariable Long id) {

        productService.deleteProduct(id);

        return ResponseEntity.ok(
                "Product deleted successfully");
    }
}
