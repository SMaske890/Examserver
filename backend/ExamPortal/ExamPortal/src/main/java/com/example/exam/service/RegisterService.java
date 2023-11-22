package com.example.exam.service;

import com.example.exam.model.User;
import com.example.exam.model.UserRole;
import com.example.exam.repo.RoleRepository;
import com.example.exam.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class RegisterService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public User register(User user, Set<UserRole> userRoles) throws Exception {

        User local = this.userRepository.findByUsername(user.getUsername());
        if(local != null){
            System.out.println("User already exists");
            throw new Exception("User already exists") ;
        }else{
            for(UserRole ur:userRoles){
                roleRepository.save(ur.getRole());
            }
            user.getUserRoles().addAll(userRoles);
            local = this.userRepository.save(user);
        }
        return local;
    }


    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }


    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }


    public List<User> getAllUsers(String username) {
        return this.userRepository.findAll();
    }
}
