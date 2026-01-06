package com.ticketbooking.user_auth_service.Controller;

import com.ticketbooking.user_auth_service.DTO.LoginRequest;
import com.ticketbooking.user_auth_service.DTO.LoginResponse;
import com.ticketbooking.user_auth_service.DTO.RegisterRequest;
import com.ticketbooking.user_auth_service.DTO.ResetPasswordRequest;
import com.ticketbooking.user_auth_service.Service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody RegisterRequest request,
                                                  HttpServletRequest httpRequest) {
        LoginResponse response = authService.register(request,httpRequest);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request,  HttpServletRequest httpRequest) {

        LoginResponse response = authService.login(request,httpRequest);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(
            @RequestParam String email) {

        try {
            authService.verifyEmail(email);
            return ResponseEntity.ok("Email verified");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestBody ResetPasswordRequest request) {

        try {
            authService.resetPassword(
                    request.getEmail(),
                    request.getNewPassword()
            );
            return ResponseEntity.ok("Password updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
