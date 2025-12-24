package org.keah.authservice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keah.authservice.DTOs.AuthResponse;
import org.keah.authservice.DTOs.LoginRequest;
import org.keah.authservice.Repository.UserRepository;
import org.keah.authservice.entity.User;
import org.keah.authservice.security.JwtGenerator;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

        private final AuthenticationManager authenticationManager;
        private final JwtGenerator jwtGenerator;
        private final UserRepository userRepository;

        public AuthResponse login(LoginRequest request) {
                try {
                        Authentication authentication = authenticationManager.authenticate(
                                        new UsernamePasswordAuthenticationToken(request.getEmail(),
                                                        request.getPassword()));

                        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
                        String token = jwtGenerator.generateToken(request.getEmail(), user.getId());
                        return new AuthResponse(token, request.getEmail());

                } catch (AuthenticationException e) {
                        log.error("[AUTH] Login failed for email: {} - Reason: {}", request.getEmail(), e.getMessage(),
                                        e);
                        throw e; // Use the exception rethrow to let Controller handle it or return 401
                }
        }
}
