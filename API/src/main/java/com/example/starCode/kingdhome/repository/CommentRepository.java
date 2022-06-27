package com.example.starCode.kingdhome.repository;


import com.example.starCode.kingdhome.models.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {

    List<Comment> findCommentById(String id);

    List<Comment> findCommentByUsername(String username);

    List<Comment> findCommentByIdArticle(String idArticle);

    List<Comment> findCommentByRating(Double rating);

    void deleteCommentById(String id);



}


