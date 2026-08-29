package com.example.demo.security.config;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.demo.security.user.entity.User;
import com.example.demo.security.user.repository.UserRepository;
import com.example.demo.security.user.entity.Role;
import java.util.Optional;

@Configuration
public class DataInitializer {


@Bean
CommandLineRunner initAdmin(UserRepository userRepository,
                            PasswordEncoder passwordEncoder) {

    return args -> {

        Optional<User> optionalAdmin =
                userRepository.findByEmail("admin@gmail.com");

        if (optionalAdmin.isEmpty()) {

            User admin = new User();
            admin.setName("Administrator");
            admin.setEmail("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);

            userRepository.save(admin);

            System.out.println("Admin created.");

                            System.out.println("=================================");
                System.out.println("ADMIN CREATED");
                System.out.println("Email: admin@gmail.com");
                System.out.println("Password: admin123");
                System.out.println("Role: ADMIN");
                System.out.println("=================================");


        } else {

            User admin = optionalAdmin.get();

            if (admin.getRole() != Role.ADMIN) {

                admin.setRole(Role.ADMIN);

                userRepository.save(admin);


                                System.out.println("=================================");
                System.out.println("ADMIN UPDATED");
                System.out.println("Email: admin@gmail.com");
                System.out.println("Password: admin123");
                System.out.println("Role: " + admin.getRole());
                System.out.println("=================================");
                System.out.println("Admin role updated.");

            }
        }
    };
}


}