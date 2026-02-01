package com.showkarte.adminService.controller;


import com.showkarte.adminService.client.AuthClient;
import com.showkarte.adminService.dto.AuthStatsResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AuthClient authClient;

    public AdminController(AuthClient authClient) {
        this.authClient = authClient;
    }

    @GetMapping("/dashboard")
    public AuthStatsResponse dashboard() {
        return authClient.getStats();
    }
}