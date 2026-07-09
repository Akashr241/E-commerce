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
                        .requestMatchers("/swagger-ui/**",
                        "/v3/api-docs/**",
                        "/swagger-ui.html").permitAll()
                        // product  API access admin
                        .requestMatchers(HttpMethod.POST,"/products").hasAuthority("ADMIN")
                         .requestMatchers(HttpMethod.PUT,"/products").hasAuthority("ADMIN")
                         .requestMatchers(HttpMethod.DELETE,"/products").hasAuthority("ADMIN")
                     
                      //product use to access the react file 
                         .requestMatchers(HttpMethod.GET,"/products").permitAll()
                         .requestMatchers(HttpMethod.GET,"/products/{id}").permitAll()
                         .requestMatchers(HttpMethod.GET,"/products/**").permitAll()
                         // auth and register
                        .requestMatchers(HttpMethod.GET,"/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/auth/register").permitAll()
 
                        // checkout API access user
                        .requestMatchers(HttpMethod.POST,"/checkout/**").permitAll()

                        // payment api 
                        .requestMatchers("/api/payments/**").permitAll()

                        // order API access admin
                         .requestMatchers(HttpMethod.PUT,"/orders/*/status").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET,"/orders/status").hasAuthority("ADMIN")
                       .requestMatchers(HttpMethod.GET, "/orders").hasAuthority("ADMIN")

                       // Orders API access user
                        .requestMatchers(HttpMethod.GET,"/orders/my-orders").hasAuthority("USER")
                        .requestMatchers(HttpMethod.PUT,"/orders/*/cancel").hasAuthority("USER")

                        // payment API access user
                        .requestMatchers(HttpMethod.POST,"/payments/create*").hasAuthority("USER")
                       //payment API access user and admin
                        .requestMatchers(HttpMethod.GET,"/payments/**").hasAnyAuthority("USER","ADMIN")

                        //cart API access user
                        .requestMatchers(HttpMethod.POST,"/cart/**").hasAuthority("USER")
                        .requestMatchers(HttpMethod.GET,"/cart/all").hasAuthority("ADMIN")
                   //     .requestMatchers(HttpMethod.GET,"/payments").hasAuthority("ADMIN")
                        

                   // razorpayment access user
                   .requestMatchers(HttpMethod.POST,"/payments/verify").hasAuthority("USER")
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