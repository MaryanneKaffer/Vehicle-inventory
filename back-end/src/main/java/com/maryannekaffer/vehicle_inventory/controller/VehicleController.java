package com.maryannekaffer.vehicle_inventory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public Page<Vehicle> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @PostMapping("/create")
    public Vehicle create(@RequestBody Vehicle vehicle) {
        return repository.save(vehicle);
    }
}