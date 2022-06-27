package com.example.starCode.kingdhome.repository;


import com.example.starCode.kingdhome.models.ShoppingCart;
import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShoppingCartRepository extends MongoRepository<ShoppingCart, String> {
    Optional<ShoppingCart> findByTotal(String total);

    Optional<ShoppingCart> findShoppingCartById(String id);

    Optional<ShoppingCart> findByUserName(String userName);


}
