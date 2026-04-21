package com.maryannekaffer.vehicle_inventory.controller;

import java.io.IOException;
import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.maryannekaffer.vehicle_inventory.dto.VehicleDTO;
import com.maryannekaffer.vehicle_inventory.entity.Vehicle;
import com.maryannekaffer.vehicle_inventory.service.VehicleService;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @GetMapping("/get")
    public Page<VehicleDTO> getAll(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) Integer manufactureYear,
            @RequestParam(required = false) BigDecimal price,
            Pageable pageable) {
        return vehicleService.findAll(name, brand, model, manufactureYear, price, pageable);
    }

    @GetMapping("/{id}")
    public VehicleDTO getById(@PathVariable Long id) {
        return vehicleService.findById(id);
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

        return vehicleService.create(name, description, brand, model, price, manufactureYear, image);
    }

    @PutMapping("/update/{id}")
    @CacheEvict(value = "vehicles", allEntries = true)
    public VehicleDTO update(
            @PathVariable Long id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) BigDecimal price,
            @RequestParam(required = false) Integer manufactureYear,
            @RequestParam(required = false) MultipartFile image) throws IOException {

        return vehicleService.update(id, name, description, brand, model, price, manufactureYear, image);
    }

    @DeleteMapping("/delete/{id}")
    @CacheEvict(value = "vehicles", allEntries = true)
    public void delete(@PathVariable Long id) throws IOException {
        vehicleService.delete(id);
    }
}