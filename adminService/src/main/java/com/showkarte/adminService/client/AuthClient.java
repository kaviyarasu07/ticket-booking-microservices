package com.showkarte.adminService.client;

import com.showkarte.adminService.dto.AuthStatsResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "USER-AUTH-SERVICE")
public interface AuthClient {

    @GetMapping("/user/stats")
    AuthStatsResponse getStats();
}