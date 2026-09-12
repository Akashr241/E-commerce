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
import com.example.demo.security.config.OAuth2AuthenticationSuccessHandler;
import com.example.demo.security.jwt.JwtAuthenticationEntryPoint;
import com.example.demo.security.jwt.JwtFilter;

@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;
private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    public SecurityConfig(
            JwtFilter jwtFilter,
            OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler,
            JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint
    ) {
        this.jwtFilter = jwtFilter;
        this.oAuth2AuthenticationSuccessHandler = oAuth2AuthenticationSuccessHandler;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http

                // ==========================================
                // CSRF
                // ==========================================

                .csrf(csrf -> csrf.disable())


                // ==========================================
                // AUTHORIZE REQUESTS
                // ==========================================

                .authorizeHttpRequests(auth -> auth

                        // ----------------------------------
                        // NORMAL AUTHENTICATION
                        // ----------------------------------

                        .requestMatchers("/auth/**").permitAll()


                        // ----------------------------------
                        // GOOGLE OAUTH2
                        // ----------------------------------

                        .requestMatchers(
                                "/oauth2/**",
                                "/login/**"
                        ).permitAll()


                        // ----------------------------------
                        // SWAGGER
                        // ----------------------------------

                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-ui.html"
                        ).permitAll()


                        // ----------------------------------
                        // PRODUCT API
                        // ADMIN ACCESS
                        // ----------------------------------

                        .requestMatchers(
                                HttpMethod.POST,
                                "/products"
                        ).hasAuthority("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/products"
                        ).hasAuthority("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/products"
                        ).hasAuthority("ADMIN")


                        // ----------------------------------
                        // PRODUCT API
                        // PUBLIC ACCESS
                        // ----------------------------------

                        .requestMatchers(
                                HttpMethod.GET,
                                "/products"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/products/{id}"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/products/**"
                        ).permitAll()


                        // ----------------------------------
                        // USERS
                        // ADMIN ACCESS
                        // ----------------------------------

                        .requestMatchers(
                                HttpMethod.GET,
                                "/users"
                        ).hasAuthority("ADMIN")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/users/**"
                        ).hasAuthority("ADMIN")


                        // ----------------------------------
                        // CHECKOUT
                        // ----------------------------------

                        .requestMatchers(
                                HttpMethod.POST,
                                "/checkout/**"
                        ).permitAll()


                        // ----------------------------------
                        // CART
                        // USER ACCESS
                        // ----------------------------------

                        .requestMatchers(
                                HttpMethod.POST,
                                "/cart/**"
                        ).hasAuthority("USER")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/cart/all"
                        ).hasAuthority("ADMIN")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/cart/my-cart"
                        ).hasAuthority("USER")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/cart/remove/{cartItemId}"
                        ).hasAuthority("USER")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/cart/remove/**"
                        ).hasAuthority("USER")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/cart/items/{id}"
                        ).hasAuthority("USER")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/cart/**"
                        ).hasAuthority("USER")


                        // ----------------------------------
                        // ORDERS
                        // ADMIN ACCESS
                        // ----------------------------------

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/orders/*/status"
                        ).hasAuthority("ADMIN")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/orders/status"
                        ).hasAuthority("ADMIN")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/orders"
                        ).hasAuthority("ADMIN")


                        // ----------------------------------
                        // ORDERS
                        // USER ACCESS
                        // ----------------------------------

                        .requestMatchers(
                                HttpMethod.GET,
                                "/orders/my-orders"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/orders/*/cancel"
                        ).hasAuthority("USER")


                        // ----------------------------------
                        // PAYMENT
                        // ----------------------------------

                        .requestMatchers(
                                "/api/payments/**"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.POST,
                                "/payments/create*"
                        ).hasAuthority("USER")

                        .requestMatchers(
                                HttpMethod.POST,
                                "/payments/verify"
                        ).hasAuthority("USER")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/payments/**"
                        ).hasAnyAuthority(
                                "USER",
                                "ADMIN"
                        )


                        // ----------------------------------
                        // RAZORPAY
                        // ----------------------------------

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/razorpay/**"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/razorpay/**"
                        ).permitAll()


                        // ----------------------------------
                        // AI
                        // ----------------------------------

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/ai/**"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/ai/chat/**"
                        ).permitAll()


                        // ----------------------------------
                        // PRESCRIPTION
                        // ----------------------------------

                        .requestMatchers(
                                HttpMethod.GET,
                                "/prescription/**"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/prescription/ocr"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/prescription/analyze"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/prescription/fda/**"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/prescription/fda/**"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/medicines/**"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/medicines/**"
                        ).permitAll()


                        // ----------------------------------
                        // ALL OTHER REQUESTS
                        // ----------------------------------

                        .anyRequest().authenticated()
                )


                // ==========================================
                // GOOGLE OAUTH2 LOGIN
                // ==========================================
.oauth2Login(oauth2 -> oauth2

        .successHandler(
                oAuth2AuthenticationSuccessHandler
        )

        .failureHandler((request, response, exception) -> {

            System.out.println("========================================");
            System.out.println("GOOGLE OAUTH LOGIN FAILED");
            System.out.println(
                    "Exception: "
                    + exception.getClass().getName()
            );
            System.out.println(
                    "Message: "
                    + exception.getMessage()
            );
            System.out.println("========================================");

            response.sendRedirect(
                    "http://localhost:3000/login?oauth2Error=true"
            );
        })
)
                
                // ==========================================
                // EXCEPTION HANDLING
                // ==========================================

                .exceptionHandling(ex -> ex

                        .authenticationEntryPoint(
                                jwtAuthenticationEntryPoint
                        )
                )


                // ==========================================
                // SESSION MANAGEMENT
                // GOOGLE OAUTH NEEDS SESSION
                // ==========================================

                .sessionManagement(session -> session

                        .sessionCreationPolicy(
                                SessionCreationPolicy.IF_REQUIRED
                        )
                )


                // ==========================================
                // JWT FILTER
                // ==========================================

                .addFilterBefore(
                        jwtFilter,
                        UsernamePasswordAuthenticationFilter.class
                );


        return http.build();
    }


    // ==========================================
    // PASSWORD ENCODER
    // ==========================================

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }
}

