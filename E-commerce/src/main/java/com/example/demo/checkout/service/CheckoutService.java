package com.example.demo.checkout.service;

import com.example.demo.checkout.dto.CheckoutRequestDto;
import com.example.demo.checkout.dto.CheckoutResponseDto;

public interface CheckoutService {

    CheckoutResponseDto checkout(CheckoutRequestDto request);

}