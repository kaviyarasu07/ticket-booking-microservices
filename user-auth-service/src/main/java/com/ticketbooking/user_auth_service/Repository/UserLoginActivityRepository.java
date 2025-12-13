package com.ticketbooking.user_auth_service.Repository;

import com.ticketbooking.user_auth_service.Entity.UserLoginActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLoginActivityRepository extends JpaRepository<UserLoginActivity,Long> {
}
