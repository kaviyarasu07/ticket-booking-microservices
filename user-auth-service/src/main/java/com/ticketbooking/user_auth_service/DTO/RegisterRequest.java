package com.ticketbooking.user_auth_service.DTO;

import lombok.Data;

@Data
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String gender;
    private String email;
    private String mobile;
    private String password;
    private String role;  // CONSUMER / ORGANISER_EVENT / ORGANISER_THEATRE / ADMIN
    private String dob;
}
