package com.example.starCode.kingdhome.controllers;

import com.example.starCode.kingdhome.models.ShoppingCart;
import com.example.starCode.kingdhome.repository.ShoppingCartRepository;
import com.example.starCode.kingdhome.service.ShoppingCartService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/shoppingCart")
public class ShoppingCartController {

    private final ShoppingCartService shoppingCartService;

    public ShoppingCartController(ShoppingCartService shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    Logger logger= LoggerFactory.getLogger(ArticleController.class);



    @GetMapping("/all")
    public ResponseEntity<List<ShoppingCart>> getAllShoppingCart () {
        List<ShoppingCart> shoppingCarts = shoppingCartService.findAllShoppingCart();
        return new ResponseEntity<>(shoppingCarts, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<ShoppingCart> getShoppingCartById (@PathVariable("id") String id) {
        ShoppingCart shoppingCart = shoppingCartService.findShoppingCartById(id);
        return new ResponseEntity<>(shoppingCart, HttpStatus.OK);
    }

    @GetMapping("/findByUsername/{username}")
    public ResponseEntity<ShoppingCart> getShoppingCartByUsername (@PathVariable("username") String username) {
        ShoppingCart shoppingCart = shoppingCartService.findShoppingCartByUserName(username);
        return new ResponseEntity<>(shoppingCart, HttpStatus.OK);
    }

    @PutMapping("/update/{username}")
    public ResponseEntity<?> updateShoppingCartByUserName(@PathVariable("username") String username, @RequestBody ShoppingCart shoppingCart) {
        ShoppingCart updateShoppingCartByUserName = shoppingCartService.updateShoppingCartInfos(username, shoppingCart.getArticles(), shoppingCart.getTotal());

        if(updateShoppingCartByUserName == null){
            logger.info("shoppingCart not found : {}", (Object) null);
            return new ResponseEntity<>("shoppingCart not found", HttpStatus.NOT_FOUND);

        }
        logger.info("shoppingCart updated : {}", updateShoppingCartByUserName);
        return new ResponseEntity<>(updateShoppingCartByUserName, HttpStatus.OK);
    }



}



