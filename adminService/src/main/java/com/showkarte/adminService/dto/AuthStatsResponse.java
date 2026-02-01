package com.showkarte.adminService.dto;
import  lombok.Data;

public record AuthStatsResponse(
        long totalUsers,
        long totalTheatreOwners,
        long totalOrganizers
) {}
