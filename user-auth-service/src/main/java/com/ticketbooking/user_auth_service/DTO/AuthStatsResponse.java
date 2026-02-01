package com.ticketbooking.user_auth_service.DTO;

public record AuthStatsResponse(
        long totalUsers,
        long totalTheatreOwners,
        long totalOrganizers
) {}
