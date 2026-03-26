package com.maryannekaffer.vehicle_inventory.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.maryannekaffer.vehicle_inventory.entity.Vehicle;
import com.maryannekaffer.vehicle_inventory.repository.VehicleRepository;

@CrossOrigin(origins = "https://vehicle-inventory.vercel.app")
@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    @Autowired
    private VehicleRepository repository;

    @Autowired
    private Cloudinary cloudinary;

    @GetMapping("/get")
    public Page<Vehicle> getAll(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) Integer manufactureYear,
            @RequestParam(required = false) BigDecimal price,
            @RequestParam(required = false) String image,
            Pageable pageable) {

        return repository.findByFilters(name, brand, model, manufactureYear, price, pageable);
    }

    @GetMapping("/{id}")
    public Vehicle getById(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
    }

    @PostMapping("/create")
    @CacheEvict(value = "vehicles", allEntries = true)
    public Vehicle create(
            @RequestParam String name,
            @RequestParam(required = false) String description,
            @RequestParam String brand,
            @RequestParam String model,
            @RequestParam BigDecimal price,
            @RequestParam int manufactureYear,
            @RequestParam(required = false) MultipartFile image) throws IOException {

        Vehicle vehicle = new Vehicle();
        vehicle.setName(name);
        vehicle.setDescription(description);
        vehicle.setBrand(brand);
        vehicle.setModel(model);
        vehicle.setPrice(price);
        vehicle.setManufactureYear(manufactureYear);

        if (image != null && !image.isEmpty()) {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(image.getBytes(),
                    ObjectUtils.asMap(
                            "transformation", new Transformation<>()
                                    .width(400)
                                    .height(250)
                                    .crop("fill")
                                    .quality("auto")
                                    .fetchFormat("avif")
                    ));
            String imageUrl = uploadResult.get("secure_url").toString();
            vehicle.setImage(imageUrl);
        }
        return repository.save(vehicle);
    }

    @DeleteMapping("/delete/{id}")
    @CacheEvict(value = "vehicles", allEntries = true)
    public Vehicle delete(@PathVariable Long id) throws IOException {
        Vehicle vehicle = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        if (id > 31 && vehicle.getImage() != null && !vehicle.getImage().isEmpty()) {
            try {
                String url = vehicle.getImage();
                String publicId = extractPublicId(url);

                cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            } catch (IOException e) {
                System.err.println("Error: " + e.getMessage());
            }
        }
        repository.delete(vehicle);
        return vehicle;
    }

    private String extractPublicId(String url) {
        String fileName = url.substring(url.lastIndexOf("/") + 1);
        return fileName.substring(0, fileName.lastIndexOf("."));
    }
}