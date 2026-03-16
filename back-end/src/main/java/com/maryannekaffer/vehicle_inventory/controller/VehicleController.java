package com.maryannekaffer.vehicle_inventory.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
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

import com.maryannekaffer.vehicle_inventory.entity.Vehicle;
import com.maryannekaffer.vehicle_inventory.repository.VehicleRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    @Autowired
    private VehicleRepository repository;

    @GetMapping("/get")
    @Cacheable("vehicles")
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

            String fileName = image.getOriginalFilename();

            Path uploadPath = Paths.get("uploads");

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Files.write(uploadPath.resolve(fileName), image.getBytes());

            vehicle.setImage(fileName);
        }

        return repository.save(vehicle);
    }

    @DeleteMapping("/delete/{id}")
    public Vehicle delete(@PathVariable Long id) throws IOException {

        Vehicle vehicle = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        if (vehicle.getImage() != null) {
            Path imagePath = Paths.get("uploads").resolve(vehicle.getImage());
            Files.deleteIfExists(imagePath);
        }

        repository.delete(vehicle);
        return vehicle;
    }
}