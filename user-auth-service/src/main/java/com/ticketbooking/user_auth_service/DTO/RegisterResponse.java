package com.ticketbooking.user_auth_service.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterResponse {
    private Long id;
    private String message;
}
