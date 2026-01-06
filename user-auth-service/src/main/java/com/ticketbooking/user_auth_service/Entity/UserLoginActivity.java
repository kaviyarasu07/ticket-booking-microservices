package com.ticketbooking.user_auth_service.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_login_activity")
public class UserLoginActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @CreationTimestamp
    @Column(name = "login_time", updatable = false)
    private LocalDateTime loginTime;

    @Column(name = "location", length = 100)
    private String location;

    @Column(name = "ip_address", length = 50)
    private String ipAddress;

    @Column(name = "device", length = 512)
    private String device;
}
