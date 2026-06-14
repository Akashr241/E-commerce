
package com.example.demo.security.user.service;
import com.example.demo.security.jwt.JwtService;

import com.example.demo.security.user.dto.AuthResponseDto;
import com.example.demo.security.user.dto.LoginRequestDto;
import com.example.demo.security.user.dto.RegisterRequestDto;
import com.example.demo.security.user.entity.User;
import com.example.demo.security.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.demo.security.user.entity.Role;
@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    public AuthServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Override
    public AuthResponseDto register(RegisterRequestDto requestDto) {

        User user = new User();

        user.setName(requestDto.getName());
        user.setEmail(requestDto.getEmail());

        // encrypted password
        user.setPassword(
                passwordEncoder.encode(requestDto.getPassword())
        );

        user.setRole(Role.USER);

        userRepository.save(user);
        String token= jwtService.generateToken(user.getEmail());

        return new AuthResponseDto(token);
    }

    @Override
    public AuthResponseDto login(LoginRequestDto requestDto) {

        User user = userRepository.findByEmail(requestDto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

                System.out.println("User found: " + user.getEmail());

                boolean isPasswordMatch = passwordEncoder.matches(
                        requestDto.getPassword(),
                        user.getPassword()
                );
                if(!isPasswordMatch) {
                    throw new RuntimeException("Invalid credentials");
                }
        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponseDto(token);
    }
}