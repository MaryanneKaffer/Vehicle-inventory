package com.maryannekaffer.vehicle_inventory.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.maryannekaffer.vehicle_inventory.dto.UserDTO;
import com.maryannekaffer.vehicle_inventory.entity.User;
import com.maryannekaffer.vehicle_inventory.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDTO create(String username, String password, String email, MultipartFile image) throws IOException {

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));

        if (image != null && !image.isEmpty()) {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(image.getBytes(),
                    ObjectUtils.asMap(
                            "folder", "userPictures",
                            "transformation", new Transformation<>()
                                    .width(200).height(200)
                                    .crop("fill").quality("auto")
                                    .fetchFormat("avif")));
            user.setPicture(uploadResult.get("secure_url").toString());
        }

        User saved = repository.save(user);
        return toDTO(saved);
    }

    public UserDTO toDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPicture());
    }
}