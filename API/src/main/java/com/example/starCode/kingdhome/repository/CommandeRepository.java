package com.example.starCode.kingdhome.repository;


import com.example.starCode.kingdhome.models.Commande;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CommandeRepository extends MongoRepository<Commande, String> {

    Optional<Commande> findCommandeById(String id);

    Optional<Commande> findCommandeByUsername(String username);

    List<Commande> findAllCommandeByUsername(String string);

}
