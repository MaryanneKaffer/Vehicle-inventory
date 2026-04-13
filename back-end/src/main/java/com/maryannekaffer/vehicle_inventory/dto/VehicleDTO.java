package com.maryannekaffer.vehicle_inventory.dto;

import java.math.BigDecimal;

public record VehicleDTO(
    Long id,
    String name,
    String description,
    String brand,
    String model,
    Integer manufactureYear,
    BigDecimal price,
    String image,
    UserDTO owner
) {}