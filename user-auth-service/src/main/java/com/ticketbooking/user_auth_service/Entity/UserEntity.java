package com.ticketbooking.user_auth_service.Entity;
import com.ticketbooking.user_auth_service.Enum.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(name = "users_email_key", columnNames = "email"),
                @UniqueConstraint(name = "users_mobile_key", columnNames = "mobile")
        },
        indexes = {
                @Index(name = "idx_users_email", columnList = "email"),
                @Index(name = "idx_users_mobile", columnList = "mobile")
        }
)
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", length = 50)
    private String firstName;

    @Column(name = "last_name", length = 50)
    private String lastName;

    @Column(name = "gender", length = 10)
    private String gender;

    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @Column(name = "mobile", length = 15)
    private String mobile;

    @Column(name = "password", nullable = false, length = 200)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 20)
    private UserRole role;

    @Column(name = "dob")
    private LocalDate dob;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
