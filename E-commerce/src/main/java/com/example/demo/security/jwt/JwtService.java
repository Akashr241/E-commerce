package com.example.demo.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;


@Service
public class JwtService {


    // ==========================================
    // SECRET KEY
    // ==========================================

    private static final String SECRET_KEY =
            "mysecretkeymysecretkeymysecretkey12";


    // ==========================================
    // GENERATE SIGNING KEY
    // ==========================================

    private Key getSignKey() {

        return Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes()
        );
    }


    // ==========================================
    // GENERATE JWT TOKEN
    // EMAIL + ROLE
    // ==========================================

    public String generateToken(
            String email,
            String role) {


        return Jwts.builder()

                // User email
                .setSubject(email)

                // User role
                .claim("role", role)

                // Token creation time
                .setIssuedAt(new Date())

                // Token expiration
                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000L
                                        * 60
                                        * 60
                                        * 24
                                        * 7
                        )
                )

                // Sign JWT
                .signWith(
                        getSignKey(),
                        SignatureAlgorithm.HS256
                )

                .compact();
    }


    // ==========================================
    // EXTRACT EMAIL
    // ==========================================

    public String extractEmail(String token) {

        return extractClaim(
                token,
                Claims::getSubject
        );
    }


    // ==========================================
    // EXTRACT ROLE
    // ==========================================

    public String extractRole(String token) {

        return extractClaim(
                token,
                claims -> claims.get("role", String.class)
        );
    }


    // ==========================================
    // EXTRACT EXPIRATION
    // ==========================================

    public Date extractExpiration(
            String token) {

        return extractClaim(
                token,
                Claims::getExpiration
        );
    }


    // ==========================================
    // GENERIC CLAIM EXTRACTOR
    // ==========================================

    public <T> T extractClaim(
            String token,
            Function<Claims, T> claimsResolver) {


        final Claims claims =
                extractAllClaims(token);


        return claimsResolver.apply(claims);
    }


    // ==========================================
    // EXTRACT ALL CLAIMS
    // ==========================================

    private Claims extractAllClaims(
            String token) {


        return Jwts.parserBuilder()

                .setSigningKey(
                        getSignKey()
                )

                .build()

                .parseClaimsJws(token)

                .getBody();
    }


    // ==========================================
    // CHECK TOKEN EXPIRATION
    // ==========================================

    private boolean isTokenExpired(
            String token) {


        return extractExpiration(token)
                .before(new Date());
    }


    // ==========================================
    // VALIDATE TOKEN
    // ==========================================

    public boolean validateToken(
            String token,
            String email) {


        final String extractedEmail =
                extractEmail(token);


        return extractedEmail.equals(email)
                && !isTokenExpired(token);
    }

}