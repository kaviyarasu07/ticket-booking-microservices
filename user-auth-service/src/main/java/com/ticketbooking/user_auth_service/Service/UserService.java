package com.ticketbooking.user_auth_service.Service;

import com.ticketbooking.user_auth_service.DTO.AuthStatsResponse;
import com.ticketbooking.user_auth_service.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository repo;

    public AuthStatsResponse getStats() {
        return repo.getStats();
    }
}
