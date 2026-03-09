package com.maryannekaffer.vehicle_inventory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
            Pageable pageable) {
        return repository.findByFilters(name, brand, model, manufactureYear, pageable);
    }

    @PostMapping("/create")
    @CacheEvict(value = "vehicles", allEntries = true)
    public Vehicle create(@RequestBody Vehicle vehicle) {
        return repository.save(vehicle);
    }
}