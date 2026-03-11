package com.maryannekaffer.vehicle_inventory.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "vehicles")
@Data
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
    @Column(nullable = false, length = 200)
    private String description;
    @Column(nullable = false, length = 50)
    private String brand;
    @Column(nullable = false, length = 50)
    private String model;
    @Column(nullable = false)
    private BigDecimal price;
    @Column(nullable = false)
    private int manufactureYear;
    @Column
    private String image;
}
