package com.example.demo.security.user.service;

import com.example.demo.security.user.dto.UserResponseDto;
import java.util.List;

public interface UserService {
  
  List<UserResponseDto> getAllUsers();

    UserResponseDto getUserById(Long id);

}
