package com.example.demo.security.jwt;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

import com.example.demo.security.user.security.CustomUserDetailsService;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService customUserDetailsService;

    public JwtFilter(JwtService jwtService, CustomUserDetailsService customUserDetailsService) {
        this.jwtService = jwtService;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader =
                request.getHeader("Authorization");

        String jwtToken = null;
        String email = null;

        // check bearer token
        if (authHeader != null
                && authHeader.startsWith("Bearer ")) {

            jwtToken = authHeader.substring(7);

            email = jwtService.extractEmail(jwtToken);
        }
        

        // authenticate user
        if (email != null
                && SecurityContextHolder
                .getContext()
                .getAuthentication() == null) {

            if (jwtService.validateToken(jwtToken, email)) {

      UserDetails userDetails =
        customUserDetailsService.loadUserByUsername(email);

UsernamePasswordAuthenticationToken authToken =
        new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );

authToken.setDetails(
        new WebAuthenticationDetailsSource()
                .buildDetails(request)
);

SecurityContextHolder.getContext()
        .setAuthentication(authToken);
}
                }
        System.out.println(authHeader);
        System.out.println(jwtToken);
        System.out.println(email);

        filterChain.doFilter(request, response);


        if (authHeader != null
        && authHeader.startsWith("Bearer ")) {

    jwtToken = authHeader.substring(7);

    try {

        email = jwtService.extractEmail(jwtToken);

    } catch (Exception e) {

        System.out.println("JWT Error: " + e.getMessage());
    }
}

            }