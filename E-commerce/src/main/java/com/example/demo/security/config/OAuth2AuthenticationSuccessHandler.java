package com.example.demo.security.config;
import java.io.IOException;
import java.util.UUID;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.example.demo.security.jwt.JwtService;
import com.example.demo.security.user.entity.Role;
import com.example.demo.security.user.entity.User;
import com.example.demo.security.user.repository.UserRepository;


@Component
public class OAuth2AuthenticationSuccessHandler
        implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;

    private final JwtService jwtService;


    public OAuth2AuthenticationSuccessHandler(
            UserRepository userRepository,
            JwtService jwtService
    ) {

        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }


    @Override
    public void onAuthenticationSuccess(

            HttpServletRequest request,

            HttpServletResponse response,

            Authentication authentication

    ) throws IOException, ServletException {


        // ==========================================
        // GET GOOGLE USER DETAILS
        // ==========================================

        OAuth2User oauthUser =
                (OAuth2User) authentication.getPrincipal();


        String email =
                oauthUser.getAttribute("email");


        String name =
                oauthUser.getAttribute("name");


        // ==========================================
        // DEBUG
        // ==========================================

        System.out.println("==================================");
        System.out.println("GOOGLE LOGIN SUCCESS");
        System.out.println("Google Email: " + email);
        System.out.println("Google Name: " + name);
        System.out.println("==================================");


        // ==========================================
        // FIND OR CREATE USER
        // ==========================================

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseGet(() -> {


                            User newUser =
                                    new User();


                            newUser.setName(name);


                            newUser.setEmail(email);


                            // Google users do not use
                            // a normal application password.
                            // Generate a random value.
                            newUser.setPassword(
                                    UUID.randomUUID().toString()
                            );


                            // Default role
                            newUser.setRole(Role.USER);


                            // Save user
                            return userRepository.save(
                                    newUser
                            );
                        });


        // ==========================================
        // GENERATE YOUR JWT
        // ==========================================

        String token =
                jwtService.generateToken(

                        user.getEmail(),

                        user.getRole().name()
                );


        // ==========================================
        // DEBUG
        // ==========================================

        System.out.println("JWT GENERATED SUCCESSFULLY");


        // ==========================================
        // REDIRECT TO REACT
        // ==========================================

        String redirectUrl =
                "http://localhost:3000/oauth2/redirect"
                        + "?token="
                        + token;


        response.sendRedirect(
                redirectUrl
        );
    }
}
