package com.ticketbooking.user_auth_service.JWT;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET =
            "showkarte-super-secure-jwt-secret-key-32";

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(String email, String role) {

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)
                )
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}