package com.example.starCode.kingdhome.controllers;

import com.example.starCode.kingdhome.models.Article;
import com.example.starCode.kingdhome.repository.ArticleRepo;
import com.example.starCode.kingdhome.service.ArticleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/articles")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService, ArticleRepo articleRepo) {
        this.articleService = articleService;
        this.articleRepo = articleRepo;
    }

    @Autowired
    private ArticleRepo articleRepo;


    Logger logger= LoggerFactory.getLogger(ArticleController.class);



    @GetMapping("/test")
    public String allAccess() {
        return "OK ADMIN ^^";
    }

    @GetMapping("/all")
    public ResponseEntity<List<Article>> getAllArticle () {
        List<Article> articles = articleService.findAllArticle();
        logger.info("articles found : {}", articles);
        return new ResponseEntity<>(articles, HttpStatus.OK);
    }

    @GetMapping("/allpage")
    public Page<Article> getAllArticlePaginated (Pageable page) {
        return articleRepo.findAll(page);
    }


    @GetMapping("/find/{id}")
    public ResponseEntity<Article> getArticleById (@PathVariable("id") String id) {
        Article article = articleService.findArticleById(id);
        logger.info("article found : {}",article);
        return new ResponseEntity<>(article, HttpStatus.OK);
    }

    @GetMapping("/find/name/{name}")
    public ResponseEntity<Article> getArticleByName (@PathVariable("name") String name) {
        Article article = articleService.findArticleByName(name);
        logger.info("article found : {}",article);
        return new ResponseEntity<>(article, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Article> addArticle(@RequestBody Article article) {
        Article newArticle = articleService.addArticle(article);
        logger.info("articles added : {}", newArticle);
        return new ResponseEntity<>(newArticle, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Article> updateArticle(@RequestBody Article article) {
        Article updateArticle = articleService.updateArticle(article);
        logger.info("articles updated : {}", updateArticle);
        return new ResponseEntity<>(updateArticle, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateArticleById(@PathVariable("id") String id, @RequestBody Article article) {

        Article updateArticleById = articleService.updateArticleById(id, article);

        if(updateArticleById == null){
            logger.info("article not found : {}", updateArticleById);
            return new ResponseEntity<>("article not found", HttpStatus.NOT_FOUND);

        }
        logger.info("article updated : {}", updateArticleById);
        return new ResponseEntity<>(updateArticleById, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteArticle(@PathVariable("id") String id) {
        articleService.deleteArticle(id);
        logger.info("article deletedById : {}", id);
        return new ResponseEntity<>("article " + id + " deleted", HttpStatus.OK);
    }


}

