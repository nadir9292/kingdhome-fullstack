package com.example.starCode.kingdhome.repository;


import com.example.starCode.kingdhome.models.Favorites;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FavoritesRepository extends MongoRepository<Favorites, String> {

    void deleteFavoritesById(String id);

    List<Favorites> findByUsername(String username);

}