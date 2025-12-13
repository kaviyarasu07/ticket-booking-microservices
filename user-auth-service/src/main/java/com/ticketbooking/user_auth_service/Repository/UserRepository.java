package com.ticketbooking.user_auth_service.Repository;

import com.ticketbooking.user_auth_service.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {
    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByMobile(String mobile);

    boolean existsByEmail(String email);

    boolean existsByMobile(String mobile);
}
