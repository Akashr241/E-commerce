package com.example.demo.product.service;

import com.example.demo.product.entity.Product;
import com.example.demo.product.repository.ProductRepository;

import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductExcelImportService {

    private final ProductRepository productRepository;

    public ProductExcelImportService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public int importProducts() {

        // Prevent duplicate import
        if (productRepository.count() > 0) {
            throw new RuntimeException(
                    "Products already exist in database. Import cancelled."
            );
        }

        List<Product> products = new ArrayList<>();

        try {

            InputStream inputStream = getClass()
                    .getClassLoader()
                    .getResourceAsStream(
                            "MediPharm_300_Product_Dataset.xlsx"
                    );

            if (inputStream == null) {
                throw new RuntimeException(
                        "Excel file not found in resources."
                );
            }

            Workbook workbook = WorkbookFactory.create(inputStream);

            Sheet sheet = workbook.getSheet("Products");

            if (sheet == null) {
                throw new RuntimeException(
                        "Products sheet not found."
                );
            }

            DataFormatter formatter = new DataFormatter();

            // Row 0 = header
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {

                Row row = sheet.getRow(i);

                if (row == null) {
                    continue;
                }

                Product product = new Product();

                // Column 1 = Name
                String name = formatter.formatCellValue(
                        row.getCell(1)
                );

                // Column 2 = Price
                String priceValue = formatter.formatCellValue(
                        row.getCell(2)
                );

                // Column 3 = Description
                String description = formatter.formatCellValue(
                        row.getCell(3)
                );

                // Column 4 = Category
                String category = formatter.formatCellValue(
                        row.getCell(4)
                );

                // Column 5 = Quantity
                String stockValue = formatter.formatCellValue(
                        row.getCell(5)
                );

                product.setName(name);
                product.setDescription(description);
                product.setCategory(category);

                priceValue = priceValue
        .replace("₹", "")
        .replace("?", "")
        .replace(",", "")
        .trim();
  product.setPrice(Double.parseDouble(priceValue));

                

                product.setStock(
                        Integer.parseInt(stockValue)
                );

                products.add(product);
            }

            workbook.close();
            inputStream.close();

            productRepository.saveAll(products);

            return products.size();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to import products: " + e.getMessage(),
                    e
            );
        }
    }
}