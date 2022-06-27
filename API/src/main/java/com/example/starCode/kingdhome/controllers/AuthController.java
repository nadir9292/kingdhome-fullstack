package com.example.starCode.kingdhome.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.starCode.kingdhome.models.CommandeArticles;
import com.example.starCode.kingdhome.models.ShoppingCart;
import com.example.starCode.kingdhome.models.User;
import com.example.starCode.kingdhome.payload.request.LoginRequest;
import com.example.starCode.kingdhome.payload.request.SessionRequest;
import com.example.starCode.kingdhome.payload.request.SignupRequest;
import com.example.starCode.kingdhome.payload.request.UserUpdateInfo;
import com.example.starCode.kingdhome.payload.response.JwtResponse;
import com.example.starCode.kingdhome.payload.response.MessageResponse;
import com.example.starCode.kingdhome.payload.response.SessionResponse;
import com.example.starCode.kingdhome.repository.ShoppingCartRepository;
import com.example.starCode.kingdhome.repository.UserRepository;
import com.example.starCode.kingdhome.security.jwt.JwtUtils;
import com.example.starCode.kingdhome.security.services.UserDetailsImpl;
import com.example.starCode.kingdhome.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ShoppingCartRepository shoppingCartRepository;

    @Autowired
    PasswordEncoder encoder;


    @Autowired
    JwtUtils jwtUtils;

    Logger logger= LoggerFactory.getLogger(ArticleController.class);


    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }



    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        logger.info("user signedIn : {}", loginRequest.getUsername());
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getRole()));
    }


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {


        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getRole());


        List<CommandeArticles> articles = new ArrayList() {{

        }};
        ShoppingCart shoppingCart = new ShoppingCart(articles,new Date(),user.getUsername(),0.00);

        userRepository.save(user);
        shoppingCartRepository.save(shoppingCart);

        logger.info("new user registered successfully: {}", signUpRequest.getUsername());
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }


    @PostMapping("/session")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SessionRequest sessionRequest) {

        try{
            Optional<User> userData = userRepository.findByUsername(jwtUtils.getUserNameFromJwtToken(sessionRequest.getToken()));

            if (userData.isPresent()) {
                // Create new user's account
                User userD = userData.get();

                SessionResponse sessionResponse = new SessionResponse(userD.getId(),userD.getUsername(),
                        userD.getEmail(),  sessionRequest.getToken());
                //sessionResponse.setRoles(roles);

                return  new ResponseEntity<>(sessionResponse, HttpStatus.OK);
            }else {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: token doesn't exist!"));
            }
        }catch(Exception e){
            return  new ResponseEntity<>("token error", HttpStatus.OK);
        }

    }

    @PutMapping("/changePassword")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserUpdateInfo userUpdateInfo) {

        Optional<User> userData = userRepository.findByUsername(userUpdateInfo.getUsername());

        if (userData.isPresent()) {
            // Create new user's account
            User userD = userData.get();
            userD.setPassword(encoder.encode(userUpdateInfo.getPassword()));

            userRepository.save(userD);
            logger.info("password reset: {}", userUpdateInfo.getUsername());
            return ResponseEntity.ok(new MessageResponse("Update registered successfully!"));
        }else {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username doesn't exist!"));
        }
    }





}
