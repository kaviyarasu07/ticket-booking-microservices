package com.ticketbooking.user_auth_service.Repository;

import com.ticketbooking.user_auth_service.DTO.AuthStatsResponse;
import com.ticketbooking.user_auth_service.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {
    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByMobile(String mobile);

    boolean existsByEmail(String email);

    boolean existsByMobile(String mobile);

    @Query("""
SELECT new com.ticketbooking.user_auth_service.DTO.AuthStatsResponse(
  SUM(CASE WHEN u.role = 'CONSUMER' THEN 1 ELSE 0 END),
  SUM(CASE WHEN u.role = 'ORGANISER_EVENT' THEN 1 ELSE 0 END),
  SUM(CASE WHEN u.role = 'ORGANISER_THEATRE' THEN 1 ELSE 0 END)
)
FROM UserEntity u
""")
    AuthStatsResponse getStats();
}
