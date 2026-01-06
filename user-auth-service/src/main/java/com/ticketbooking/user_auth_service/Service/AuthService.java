package com.ticketbooking.user_auth_service.Service;

import com.ticketbooking.user_auth_service.Entity.UserLoginActivity;
import com.ticketbooking.user_auth_service.Expections.InvalidCredentialsException;
import com.ticketbooking.user_auth_service.DTO.LoginRequest;
import com.ticketbooking.user_auth_service.DTO.LoginResponse;
import com.ticketbooking.user_auth_service.DTO.RegisterRequest;
import com.ticketbooking.user_auth_service.DTO.RegisterResponse;
import com.ticketbooking.user_auth_service.Entity.UserEntity;
import com.ticketbooking.user_auth_service.Enum.UserRole;
import com.ticketbooking.user_auth_service.JWT.JwtUtil;
import com.ticketbooking.user_auth_service.Repository.UserLoginActivityRepository;
import com.ticketbooking.user_auth_service.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final UserLoginActivityRepository loginActivityRepository;

    public LoginResponse register(RegisterRequest request,HttpServletRequest httpReq) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        if (userRepository.existsByMobile(request.getMobile())) {
            throw new IllegalArgumentException("Mobile number already registered");
        }

        UserEntity user = new UserEntity();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setGender(request.getGender());
        user.setEmail(request.getEmail());
        user.setMobile(request.getMobile());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        String role=UserRole.CONSUMER.name();
        if(request.getRole().equalsIgnoreCase("THEATRE_OWNER")){
            role=UserRole.ORGANISER_THEATRE.name();
        } else if (request.getRole().equalsIgnoreCase("EVENT_ORGANIZER")) {
            role=UserRole.ORGANISER_EVENT.name();
        }
        user.setRole(role);

        if (request.getDob() != null) {
            user.setDob(LocalDate.parse(request.getDob()));
        }

        UserEntity savedUser = userRepository.save(user);
        String token = jwtUtil.generateToken(
                savedUser.getEmail(),
                savedUser.getRole()
        );
        saveUserActivity(savedUser,httpReq);
        return new LoginResponse(
                token,
                savedUser.getEmail(),
                savedUser.getRole()
        );
    }

    public LoginResponse login(LoginRequest request,  HttpServletRequest httpRequest) {

        UserEntity user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }
        saveUserActivity(user,httpRequest);

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().toString());

        return new LoginResponse(token, user.getEmail(), user.getRole().toString());
    }
    public void verifyEmail(String email) {

        boolean exists = userRepository.existsByEmail(email);

        if (!exists) {
            throw new RuntimeException("Email not registered");
        }
    }
    public void resetPassword(String email, String newPassword) {

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Email not registered"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    private void  saveUserActivity(UserEntity user,HttpServletRequest httpRequest){
        UserLoginActivity activity = new UserLoginActivity();
        activity.setUser(user);
        activity.setIpAddress(getClientIp(httpRequest));
        activity.setDevice(httpRequest.getHeader("User-Agent"));
        activity.setLocation("UNKNOWN"); // later via geo-IP

        loginActivityRepository.save(activity);
    }
    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0];
        }
        return request.getRemoteAddr();
    }
}
