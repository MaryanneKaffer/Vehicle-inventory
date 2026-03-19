package com.maryannekaffer.vehicle_inventory.repository;

import java.math.BigDecimal;

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
                            WHERE (CAST(:name AS string) IS NULL OR LOWER(v.name) LIKE LOWER(CONCAT('%', CAST(:name AS string), '%')))
                            AND (CAST(:brand AS string) IS NULL OR LOWER(v.brand) LIKE LOWER(CONCAT('%', CAST(:brand AS string), '%')))
                            AND (CAST(:model AS string) IS NULL OR LOWER(v.model) LIKE LOWER(CONCAT('%', CAST(:model AS string), '%')))
                            AND (:manufactureYear IS NULL OR v.manufactureYear = :manufactureYear)
                            AND (:price IS NULL OR v.price = :price)
                        """)
        Page<Vehicle> findByFilters(
                        @Param("name") String name,
                        @Param("brand") String brand,
                        @Param("model") String model,
                        @Param("manufactureYear") Integer manufactureYear,
                        @Param("price") BigDecimal price,
                        Pageable pageable);
}