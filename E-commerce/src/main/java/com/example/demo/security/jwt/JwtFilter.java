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

import java.io.IOException;

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

         System.out.println("jwt filter was started");
    final String authHeader =
            request.getHeader("Authorization");
System.out.println("Authorization header: " + authHeader);
System.out.println("Request URI: " + request.getRequestURI());
                String jwtToken = null;
                String email = null;

    if (authHeader != null
            && authHeader.startsWith("Bearer ")) {
System.out.println("Bearer token found");
        jwtToken = authHeader.substring(7);
System.out.println("extracted JWT token: " + jwtToken);


        email = jwtService.extractEmail(jwtToken);
System.out.println("extracted email: " + email);



    }

    if (email != null
            && SecurityContextHolder
            .getContext()
            .getAuthentication() == null) {

        if (jwtService.validateToken(jwtToken, email)) {

            UserDetails userDetails =
                    customUserDetailsService
                            .loadUserByUsername(email);

            System.out.println("Authorities: "
                    + userDetails.getAuthorities());

            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities());

            authToken.setDetails(
                    new WebAuthenticationDetailsSource()
                            .buildDetails(request));

            SecurityContextHolder.getContext()
                    .setAuthentication(authToken);
        }
    }
   

System.out.println(SecurityContextHolder.getContext()
                        .getAuthentication());
                        
if (SecurityContextHolder.getContext().getAuthentication() != null) {
    System.out.println(SecurityContextHolder.getContext()
                                .getAuthentication()
                                .getAuthorities() );
                        
                
}            
        filterChain.doFilter(request, response);

}
}