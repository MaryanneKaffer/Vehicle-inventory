package com.maryannekaffer.vehicle_inventory.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.maryannekaffer.vehicle_inventory.entity.Vehicle;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    @Query("""
            SELECT v FROM Vehicle v
            WHERE (:name IS NULL OR LOWER(v.name) LIKE LOWER(CONCAT('%', :name, '%')))
            AND (:brand IS NULL OR LOWER(v.brand) LIKE LOWER(CONCAT('%', :brand, '%')))
            AND (:model IS NULL OR LOWER(v.model) LIKE LOWER(CONCAT('%', :model, '%')))
            AND (:manufactureYear IS NULL OR v.manufactureYear = :manufactureYear)
            """)
    Page<Vehicle> findByFilters(
            @Param("name") String name,
            @Param("brand") String brand,
            @Param("model") String model,
            @Param("manufactureYear") Integer manufactureYear,
            Pageable pageable);
}