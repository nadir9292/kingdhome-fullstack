package com.example.starCode.kingdhome.repository;


import com.example.starCode.kingdhome.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);

    Optional<User> findById(String id);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}