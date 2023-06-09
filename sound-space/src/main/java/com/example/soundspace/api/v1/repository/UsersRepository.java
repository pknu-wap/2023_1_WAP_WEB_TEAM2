package com.example.soundspace.api.v1.repository;

import com.example.soundspace.api.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByUsername(String username);
    List<Users> findByUsernameContaining(String query);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
