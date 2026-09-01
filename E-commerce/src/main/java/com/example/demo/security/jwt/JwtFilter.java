package com.example.demo.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.security.user.security.CustomUserDetailsService;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final CustomUserDetailsService customUserDetailsService;


    public JwtFilter(
            JwtService jwtService,
            CustomUserDetailsService customUserDetailsService) {

        this.jwtService = jwtService;

        this.customUserDetailsService =
                customUserDetailsService;
    }


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {


        System.out.println();
        System.out.println("========================================");
        System.out.println("JWT FILTER STARTED");
        System.out.println("========================================");


        // -----------------------------------------
        // REQUEST INFORMATION
        // -----------------------------------------

        System.out.println(
                "Request Method: "
                        + request.getMethod()
        );

        System.out.println(
                "Request URI: "
                        + request.getRequestURI()
        );


        // -----------------------------------------
        // GET AUTHORIZATION HEADER
        // -----------------------------------------

        final String authHeader =
                request.getHeader("Authorization");


        System.out.println(
                "Authorization Header: "
                        + authHeader
        );


        String jwtToken = null;

        String email = null;


        // -----------------------------------------
        // CHECK BEARER TOKEN
        // -----------------------------------------

        if (authHeader != null
                && authHeader.startsWith("Bearer ")) {


            System.out.println(
                    "Bearer token found."
            );


            jwtToken =
                    authHeader.substring(7);


            System.out.println(
                    "JWT token received."
            );


            // -----------------------------------------
            // EXTRACT EMAIL
            // -----------------------------------------

            try {

                email =
                        jwtService.extractEmail(
                                jwtToken
                        );


                System.out.println(
                        "Extracted Email: "
                                + email
                );


            } catch (Exception exception) {

                System.out.println(
                        "ERROR: Unable to extract email from JWT."
                );

                System.out.println(
                        "JWT Error: "
                                + exception.getMessage()
                );

            }

        } else {

            System.out.println(
                    "No Bearer token found."
            );

        }


        // -----------------------------------------
        // CHECK CURRENT AUTHENTICATION
        // -----------------------------------------

        if (email != null
                && SecurityContextHolder
                .getContext()
                .getAuthentication() == null) {


            System.out.println(
                    "No existing authentication."
            );


            // -----------------------------------------
            // VALIDATE TOKEN
            // -----------------------------------------

            try {

                boolean validToken =
                        jwtService.validateToken(
                                jwtToken,
                                email
                        );


                System.out.println(
                        "JWT Valid: "
                                + validToken
                );


                if (validToken) {


                    // -----------------------------------------
                    // LOAD USER
                    // -----------------------------------------

                    UserDetails userDetails =
                            customUserDetailsService
                                    .loadUserByUsername(
                                            email
                                    );


                    System.out.println(
                            "User loaded successfully."
                    );

                    System.out.println(
                            "Username: "
                                    + userDetails
                                    .getUsername()
                    );


                    // -----------------------------------------
                    // USER AUTHORITIES / ROLE
                    // -----------------------------------------

                    System.out.println(
                            "User Authorities: "
                                    + userDetails
                                    .getAuthorities()
                    );


                    // -----------------------------------------
                    // CREATE AUTHENTICATION
                    // -----------------------------------------

                    UsernamePasswordAuthenticationToken
                            authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails
                                            .getAuthorities()
                            );


                    authToken.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );


                    // -----------------------------------------
                    // STORE AUTHENTICATION
                    // -----------------------------------------

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(
                                    authToken
                            );


                    System.out.println(
                            "Authentication successfully stored."
                    );


                    System.out.println(
                            "Logged-in User: "
                                    + userDetails
                                    .getUsername()
                    );


                    System.out.println(
                            "Logged-in Authorities: "
                                    + userDetails
                                    .getAuthorities()
                    );


                } else {

                    System.out.println(
                            "JWT TOKEN IS INVALID."
                    );

                }


            } catch (Exception exception) {

                System.out.println(
                        "JWT VALIDATION ERROR"
                );

                System.out.println(
                        "Error: "
                                + exception.getMessage()
                );

            }

        }


        // -----------------------------------------
        // FINAL SECURITY CONTEXT
        // -----------------------------------------

        var authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();


        System.out.println();
        System.out.println(
                "========== FINAL SECURITY CONTEXT =========="
        );


        if (authentication != null) {


            System.out.println(
                    "Authenticated: YES"
            );


            System.out.println(
                    "Principal: "
                            + authentication
                            .getName()
            );


            System.out.println(
                    "Authorities: "
                            + authentication
                            .getAuthorities()
            );


        } else {

            System.out.println(
                    "Authenticated: NO"
            );

        }


        System.out.println(
                "============================================"
        );


        // -----------------------------------------
        // CONTINUE REQUEST
        // -----------------------------------------

        filterChain.doFilter(
                request,
                response
        );

    }
}