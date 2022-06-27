package com.example.starCode.kingdhome.repository;


import com.example.starCode.kingdhome.models.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PaymentRepository extends MongoRepository<Payment, String> {
    Optional<Payment> findArticleById(String id);

}

