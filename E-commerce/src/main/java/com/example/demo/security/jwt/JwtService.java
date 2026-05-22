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

    // secret key
    private static final String SECRET_KEY =
            "mysecretkeymysecretkeymysecretkey12";

    // generate signing key
    private Key getSignKey() {

        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // generate token
    public String generateToken(String email) {

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis()
                                + 1000L * 60 * 60*24*7)
                )
                .signWith(getSignKey(),
                        SignatureAlgorithm.HS256)
                .compact();
    }

    // extract email from token
    public String extractEmail(String token) {

        return extractClaim(token, Claims::getSubject);
    }

    // extract expiration
    public Date extractExpiration(String token) {

        return extractClaim(token, Claims::getExpiration);
    }

    // generic claim extractor
    public <T> T extractClaim(String token,
                              Function<Claims, T> claimsResolver) {

        final Claims claims = extractAllClaims(token);

        return claimsResolver.apply(claims);
    }

    // extract all claims
    private Claims extractAllClaims(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // check token expiration
    private boolean isTokenExpired(String token) {

        return extractExpiration(token)
                .before(new Date());
    }

    // validate token
    public boolean validateToken(
            String token,
            String email) {

        final String extractedEmail =
                extractEmail(token);

        return extractedEmail.equals(email)
                && !isTokenExpired(token);
    }
}