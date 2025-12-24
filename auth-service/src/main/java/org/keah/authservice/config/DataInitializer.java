package org.keah.authservice.config;

import lombok.RequiredArgsConstructor;
import org.keah.authservice.Repository.UserRepository;
import org.keah.authservice.entity.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initializeData() {
        return args -> {
            User user = userRepository.findByEmail("user@test.com").orElseGet(() -> {
                User newUser = new User();
                newUser.setEmail("user@test.com");
                return newUser;
            });

            // Always reset password to ensure we know it
            user.setPassword(passwordEncoder.encode("password123"));
            userRepository.save(user); // save() works for both insert and update if id is set
            System.out.println("SEED DATA: Ensure user@test.com has password 'password123'");
        };
    }
}
