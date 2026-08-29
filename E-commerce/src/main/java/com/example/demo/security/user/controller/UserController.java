package com.example.demo.security.user.controller;

import com.example.demo.security.user.dto.UserResponseDto;
import com.example.demo.security.user.service.UserService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ==========================================
    // GET ALL USERS
    // ADMIN ONLY
    // ==========================================

    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {

        System.out.println("========== GET ALL USERS ==========");

        return ResponseEntity.ok(
                userService.getAllUsers()
        );
    }

    // ==========================================
    // GET USER BY ID
    // ADMIN ONLY
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUserById(
            @PathVariable Long id) {

        System.out.println(
                "========== GET USER BY ID =========="
        );

        System.out.println("User ID: " + id);

        return ResponseEntity.ok(
                userService.getUserById(id)
        );
    }
}