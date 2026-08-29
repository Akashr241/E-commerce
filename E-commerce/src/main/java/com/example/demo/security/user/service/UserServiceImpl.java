package com.example.demo.security.user.service;

import com.example.demo.security.user.dto.UserResponseDto;
import com.example.demo.security.user.entity.User;
import com.example.demo.security.user.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ==========================================
    // GET ALL USERS
    // ==========================================

    @Override
    public List<UserResponseDto> getAllUsers() {

        System.out.println("========== ADMIN USERS ==========");
        System.out.println("Fetching all users...");

        List<User> users = userRepository.findAll();

        System.out.println("Total users found: " + users.size());

        return users.stream()
                .map(this::convertToDto)
                .toList();
    }

    // ==========================================
    // GET USER BY ID
    // ==========================================

    @Override
    public UserResponseDto getUserById(Long id) {

        System.out.println("========== ADMIN USER ==========");
        System.out.println("Searching user ID: " + id);

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with ID: " + id
                        )
                );

        System.out.println("User found: " + user.getEmail());

        return convertToDto(user);
    }

    // ==========================================
    // ENTITY → DTO
    // ==========================================

    private UserResponseDto convertToDto(User user) {

        return new UserResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}