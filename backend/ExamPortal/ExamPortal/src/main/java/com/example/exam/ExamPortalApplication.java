package com.example.exam;

import com.example.exam.model.Role;
import com.example.exam.model.User;
import com.example.exam.model.UserRole;
import com.example.exam.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ExamPortalApplication implements CommandLineRunner{

	@Autowired
	private RegisterService registerService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(ExamPortalApplication.class, args);
		System.out.println("Hi");
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Code Started");

//		User user = new User();
//		user.setFirstName("Sakshi");
//		user.setLastName("Maske");
//		user.setUsername("SakshiM");
//		user.setPassword(this.passwordEncoder.encode("sakshi"));
//		user.setEmail("sakshi@gmail.com");
//		user.setProfile("default.jpg");
//		user.setPhone("8149891527");
//
//		Role role1 = new Role();
//		role1.setRoleId(44L);
//		role1.setRoleName("ADMIN");
//
//		Set<UserRole> userRoleSet = new HashSet<>();
//		UserRole userRole = new UserRole();
//		userRole.setRole(role1);
//		userRole.setUser(user);
//
//		userRoleSet.add(userRole);
//		User user1 = this.registerService.register(user , userRoleSet);
//		System.out.println(user1.getUsername());
	}
}
