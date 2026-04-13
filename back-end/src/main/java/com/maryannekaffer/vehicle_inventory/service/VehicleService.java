package com.maryannekaffer.vehicle_inventory.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.maryannekaffer.vehicle_inventory.dto.UserDTO;
import com.maryannekaffer.vehicle_inventory.dto.VehicleDTO;
import com.maryannekaffer.vehicle_inventory.entity.User;
import com.maryannekaffer.vehicle_inventory.entity.Vehicle;
import com.maryannekaffer.vehicle_inventory.repository.VehicleRepository;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository repository;

    @Autowired
    private Cloudinary cloudinary;

    public VehicleDTO findById(Long id) {
        Vehicle vehicle = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        return mapToDTO(vehicle);
    }

    private Vehicle findVehicleById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
    }

    public Page<VehicleDTO> findAll(String name, String brand, String model, Integer year, BigDecimal price,
            Pageable pageable) {
        return repository.findByFilters(name, brand, model, year, price, pageable)
                .map(this::mapToDTO);
    }

    private VehicleDTO mapToDTO(Vehicle vehicle) {
        UserDTO ownerDTO = new UserDTO(
                vehicle.getOwner().getId(),
                vehicle.getOwner().getUsername(),
                vehicle.getOwner().getEmail(),
                vehicle.getOwner().getPicture());

        return new VehicleDTO(
                vehicle.getId(),
                vehicle.getName(),
                vehicle.getDescription(),
                vehicle.getBrand(),
                vehicle.getModel(),
                vehicle.getManufactureYear(),
                vehicle.getPrice(),
                vehicle.getImage(),
                ownerDTO);
    }

    public Vehicle create(String name, String description, String brand, String model,
            BigDecimal price, int year, MultipartFile image) throws IOException {

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Vehicle vehicle = new Vehicle();
        vehicle.setOwner(user);
        vehicle.setName(name);
        vehicle.setDescription(description);
        vehicle.setBrand(brand);
        vehicle.setModel(model);
        vehicle.setPrice(price);
        vehicle.setManufactureYear(year);

        if (image != null && !image.isEmpty()) {
            String imageUrl = uploadImage(image);
            vehicle.setImage(imageUrl);
        }

        return repository.save(vehicle);
    }

    public void delete(Long id) throws IOException {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Vehicle vehicle = findVehicleById(id);

        if (!vehicle.getOwner().getEmail().equals(currentUser.getEmail())) {
            throw new AccessDeniedException("You don't have permission to delete this post");
        }

        if (vehicle.getImage() != null && !vehicle.getImage().isEmpty()) {
            deleteImage(vehicle.getImage());
        }

        repository.delete(vehicle);
    }

    private String uploadImage(MultipartFile image) throws IOException {
        Map<?, ?> uploadResult = cloudinary.uploader().upload(image.getBytes(),
                ObjectUtils.asMap(
                        "transformation", new Transformation<>()
                                .width(350).height(200).crop("fill")
                                .quality("auto").fetchFormat("avif")));
        return uploadResult.get("secure_url").toString();
    }

    private void deleteImage(String url) throws IOException {
        String publicId = extractPublicId(url);
        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }

    private String extractPublicId(String url) {
        String fileName = url.substring(url.lastIndexOf("/") + 1);
        return fileName.substring(0, fileName.lastIndexOf("."));
    }
}