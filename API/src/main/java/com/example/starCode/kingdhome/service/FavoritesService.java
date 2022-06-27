package com.example.starCode.kingdhome.service;


import com.example.starCode.kingdhome.models.Favorites;
import com.example.starCode.kingdhome.repository.FavoritesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import java.util.List;


@Service
@Transactional
public class FavoritesService {
    private final FavoritesRepository favoritesRepository;

    @Autowired
    public FavoritesService(FavoritesRepository favoritesRepository) {
        this.favoritesRepository = favoritesRepository;
    }


    public List<Favorites> findAllFavorites() {
        return favoritesRepository.findAll();
    }


    public Favorites findFavoritesById(String id) {
        return favoritesRepository.findById(id)
                .orElseThrow(() -> new Error("Favorites by id " + id + " was not found"));
    }

    public List<Favorites> findFavoritesByUserName(String username) {
        return favoritesRepository.findByUsername(username);
    }

    public Favorites addFavorites(Favorites favorites) {
        return favoritesRepository.save(favorites);
    }


    public void deleteFavorites(String id){
        favoritesRepository.deleteFavoritesById(id);
    }







}
