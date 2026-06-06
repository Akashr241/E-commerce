package com.example.demo.security.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.demo.security.jwt.JwtAuthenticationEntryPoint;
import com.example.demo.security.jwt.JwtFilter;

@Configuration
public class SecurityConfig {

        private final JwtFilter jwtFilter;

        private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
        public SecurityConfig(JwtFilter jwtFilter,
                                  JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint) {
            this.jwtFilter = jwtFilter;
            this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        }
        @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/products").hasAuthority("ADMIN")
                         .requestMatchers(HttpMethod.PUT,"/products").hasAuthority("ADMIN")
                         .requestMatchers(HttpMethod.DELETE,"/products").hasAuthority("ADMIN")
                       // .requestMatchers(HttpMethod.POST,"/products").permitAll()


                        .requestMatchers("/orders/**")
                        .hasRole("USER")
                        .requestMatchers("/products/add")
                        .hasRole("ADMIN")
                        .anyRequest().authenticated()
                        
                )
                                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(
                                jwtAuthenticationEntryPoint
                        )
                )

                .sessionManagement(session -> session
                        .sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .addFilterBefore(
                        jwtFilter,
                        UsernamePasswordAuthenticationFilter.class
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }
}