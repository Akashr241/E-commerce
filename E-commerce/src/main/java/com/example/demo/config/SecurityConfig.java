
package com.example.demo.config;
import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())   // 🔥 disable CSRF (important)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/cart/**").permitAll() // allow your API
                .anyRequest().authenticated()
            );

        return http.build();
    }
}