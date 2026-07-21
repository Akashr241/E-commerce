package com.example.demo.security.config;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.demo.security.user.entity.User;
import com.example.demo.security.user.repository.UserRepository;
import com.example.demo.security.user.entity.Role;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initAdmin(UserRepository userRepository,
                                PasswordEncoder passwordEncoder) {

        return args -> {

            if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {

                User admin = new User();

                admin.setName("Administrator");
                admin.setEmail("admin@gmail.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(Role.ADMIN);

                userRepository.save(admin);

                System.out.println("Admin user created!");
            }

        };
    }
}