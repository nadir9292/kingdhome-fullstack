package com.example.starCode.kingdhome.repository;

import com.example.starCode.kingdhome.models.Article;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ArticleRepo  extends MongoRepository<Article, String> {
    void deleteArticleById(String id);

    Optional<Article> findArticleById(String id);
    Article findArticleByName(String name);


}
