package com.example.demo.security.user.service;

import com.example.demo.security.user.dto.AuthResponseDto;
import com.example.demo.security.user.dto.LoginRequestDto;
import com.example.demo.security.user.dto.RegisterRequestDto;

public interface AuthService {

    AuthResponseDto register(RegisterRequestDto requestDto);

    AuthResponseDto login(LoginRequestDto requestDto);
}