package com.ticketbooking.user_auth_service.Service;

import com.ticketbooking.user_auth_service.DTO.RegisterRequest;
import com.ticketbooking.user_auth_service.DTO.RegisterResponse;
import com.ticketbooking.user_auth_service.Entity.UserEntity;
import com.ticketbooking.user_auth_service.Enum.UserRole;
import com.ticketbooking.user_auth_service.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public RegisterResponse register(RegisterRequest request) {


        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered!");
        }

        if (userRepository.existsByMobile(request.getMobile())) {
            throw new RuntimeException("Mobile number already registered!");
        }

        UserEntity user = new UserEntity();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setGender(request.getGender());
        user.setEmail(request.getEmail());
        user.setMobile(request.getMobile());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setRole(UserRole.valueOf(request.getRole()));

        if (request.getDob() != null) {
            user.setDob(LocalDate.parse(request.getDob()));
        }

        UserEntity saved = userRepository.save(user);

        return new RegisterResponse(saved.getId(), "User registered successfully");
    }
}
