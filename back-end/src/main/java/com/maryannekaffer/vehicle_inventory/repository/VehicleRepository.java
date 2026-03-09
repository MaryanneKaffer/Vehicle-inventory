package com.maryannekaffer.vehicle_inventory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.maryannekaffer.vehicle_inventory.entity.Vehicle;

@Repository
public interface  VehicleRepository extends JpaRepository<Vehicle, Long> {
    
}