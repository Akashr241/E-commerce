package com.example.demo.security.user.controller;

import com.example.demo.security.user.dto.AuthResponseDto;
import com.example.demo.security.user.dto.LoginRequestDto;
import com.example.demo.security.user.dto.RegisterRequestDto;
import com.example.demo.security.user.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponseDto register(
            @RequestBody RegisterRequestDto requestDto) {

        return authService.register(requestDto);
    }

    @PostMapping("/login")
    public AuthResponseDto login(
            @RequestBody LoginRequestDto requestDto) {

        return authService.login(requestDto);
    }
}