package com.example.starCode.kingdhome.service;

import com.example.starCode.kingdhome.models.Commande;
import com.example.starCode.kingdhome.repository.CommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import java.util.List;


@Service
@Transactional
public class CommandeService {

    private final CommandeRepository commandeRepository;

    @Autowired
    public CommandeService(CommandeRepository commandeRepository) {
        this.commandeRepository = commandeRepository;
    }

    public List<Commande> findAllCommande() {
        return commandeRepository.findAll();
    }

    public Commande findCommandeById(String id) {
        return commandeRepository.findById(id)
                .orElseThrow(() -> new Error("User by id " + id + " was not found"));
    }

    public List<Commande> findCommandeByUsername(String username) {
        return commandeRepository.findAllCommandeByUsername(username);

    }



}
