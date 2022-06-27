package com.example.starCode.kingdhome.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.starCode.kingdhome.models.CommandeArticles;
import com.example.starCode.kingdhome.models.ShoppingCart;
import com.example.starCode.kingdhome.repository.ShoppingCartRepository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ShoppingCartService {
    private final ShoppingCartRepository shoppingCartRepository;

    @Autowired
    public ShoppingCartService(ShoppingCartRepository shoppingCartRepository) {
        this.shoppingCartRepository = shoppingCartRepository;
    }

    public List<ShoppingCart> findAllShoppingCart() {
        return shoppingCartRepository.findAll();
    }



    public ShoppingCart findShoppingCartById(String id) {
        return shoppingCartRepository.findById(id)
                .orElseThrow(() -> new Error("ShoppingCart by id " + id + " was not found"));
    }


    public ShoppingCart findShoppingCartByUserName(String username) {
        return shoppingCartRepository.findByUserName(username).orElse(null);
    }


    public ShoppingCart updateShoppingCartInfos(String username, List<CommandeArticles> commandeArticles, Double total) {
        Optional<ShoppingCart> shoppingCartData = shoppingCartRepository.findByUserName(username);

        if (shoppingCartData.isPresent()) {
            ShoppingCart _shoppingCart = shoppingCartData.get();
            _shoppingCart.setArticles(commandeArticles);
            _shoppingCart.setDate(new Date());
            _shoppingCart.setTotal(total);

            return shoppingCartRepository.save(_shoppingCart);
        }
        return null;
    }



}
