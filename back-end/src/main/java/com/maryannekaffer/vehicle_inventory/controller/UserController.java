package com.maryannekaffer.vehicle_inventory.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.maryannekaffer.vehicle_inventory.dto.LoginDTO;
import com.maryannekaffer.vehicle_inventory.dto.LoginResponseDTO;
import com.maryannekaffer.vehicle_inventory.entity.User;
import com.maryannekaffer.vehicle_inventory.repository.UserRepository;
import com.maryannekaffer.vehicle_inventory.service.TokenService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository repository;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/create")
    @CacheEvict(value = "users", allEntries = true)
    public User create(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String email,
            @RequestParam(required = false) MultipartFile image) throws IOException {

        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);

        String encryptedPassword = passwordEncoder.encode(password);
        user.setPassword(encryptedPassword);

        if (image != null && !image.isEmpty()) {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(image.getBytes(),
                    ObjectUtils.asMap(
                            "folder", "userPictures",
                            "transformation", new Transformation<>()
                                    .width(200).height(200)
                                    .crop("fill").quality("auto")
                                    .fetchFormat("avif")));
            String imageUrl = uploadResult.get("secure_url").toString();
            user.setPicture(imageUrl);
        }

        return repository.save(user);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe() {
        var auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(401).body("Não autenticado");
        }

        return ResponseEntity.ok(auth.getPrincipal());
    }

    @RestController
    @RequestMapping("/auth")
    public class AuthController {

        @Autowired
        private AuthenticationManager authenticationManager;

        @Autowired
        private TokenService tokenService;

        @PostMapping("/login")
        public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginDTO data) {
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
            var auth = this.authenticationManager.authenticate(usernamePassword);
            var token = tokenService.generateToken((User) auth.getPrincipal());

            return ResponseEntity.ok(new LoginResponseDTO(token));
        }
    }
}
