package com.example.exam.controller;

import com.example.exam.model.JwtRequest;
import com.example.exam.model.JwtResponse;
import com.example.exam.model.User;
import com.example.exam.security.JwtHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtHelper helper;

    private Logger logger = LoggerFactory.getLogger(AuthController.class);

    @CrossOrigin(origins = "http://localhost:4200" , exposedHeaders = "token")
    @PostMapping("auth/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) throws Exception {

        this.doAuthenticate(request.getUname(), request.getPassword());
        logger.info("Authentication done!!!!!!!");
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUname());

        String token = this.helper.generateToken(userDetails);
        logger.info("Token generated!!!!!!!!");
        JwtResponse response = JwtResponse.builder()
                .jwtToken(token)
                .uname(userDetails.getUsername()).build();
        logger.info("Sending response!!!!!!!");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void doAuthenticate(String uname, String password) throws Exception {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(uname, password);
        try {
            manager.authenticate(authentication);

        } catch (Exception e) {
            throw new Exception("Invalid Username or Password  !!");
        }
    }


    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true" ,exposedHeaders = "token")
    @GetMapping("auth/current-user")
    public User getCurrentUser(@AuthenticationPrincipal UserDetails userDetails){
        logger.info("Fetching current user!!!!!!!!");
        System.out.println("User Details: " + userDetails.getUsername());
        return (User) userDetailsService.loadUserByUsername(userDetails.getUsername());
    }

}
