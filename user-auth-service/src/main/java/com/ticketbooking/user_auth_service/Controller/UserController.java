package com.ticketbooking.user_auth_service.Controller;

import com.ticketbooking.user_auth_service.DTO.AuthStatsResponse;
import com.ticketbooking.user_auth_service.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final  UserService userService;

    @GetMapping("/stats")
    public AuthStatsResponse stats() {
        return userService.getStats();
    }
}
