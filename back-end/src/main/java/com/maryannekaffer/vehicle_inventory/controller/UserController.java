package com.maryannekaffer.vehicle_inventory.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.maryannekaffer.vehicle_inventory.dto.UserDTO;
import com.maryannekaffer.vehicle_inventory.entity.User;
import com.maryannekaffer.vehicle_inventory.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    @CacheEvict(value = "users", allEntries = true)
    public ResponseEntity<UserDTO> create(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String email,
            @RequestParam(required = false) MultipartFile image) throws IOException {

        UserDTO dto = userService.create(username, password, email, image);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe() {
        var auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(401).body("Não autenticado");
        }

        User user = (User) auth.getPrincipal();
        return ResponseEntity.ok(userService.toDTO(user));
    }
}