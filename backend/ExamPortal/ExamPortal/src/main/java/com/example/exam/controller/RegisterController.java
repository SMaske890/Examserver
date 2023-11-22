package com.example.exam.controller;

import com.example.exam.model.Role;
import com.example.exam.model.User;
import com.example.exam.model.UserRole;
import com.example.exam.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/user")
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @PostMapping("/register")
    public User createUser(@RequestBody User user) throws Exception {
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        user.setProfile("default.png");
        Set<UserRole> roles = new HashSet<>();

        Role role=new Role();
        role.setRoleId(45L);
        role.setRoleName("NORMAL");

        UserRole userRole=new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        roles.add(userRole);

        return this.registerService.register(user,roles);
    }


    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @GetMapping("/{username}")
    public  User getUser(@PathVariable("username") String username){
        return this.registerService.getUser(username);
    }


    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @GetMapping("/allUsers")
    public List<User> getAllUser(String username){
        return this.registerService.getAllUsers(username);
    }


    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable ("userId") Long userId){
        this.registerService.deleteUser(userId);
    }
}
