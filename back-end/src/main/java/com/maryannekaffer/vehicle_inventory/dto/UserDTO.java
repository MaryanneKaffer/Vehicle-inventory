package com.maryannekaffer.vehicle_inventory.dto;

import java.util.UUID;

public record UserDTO(
        UUID id,
        String username,
        String email,
        String picture) {
}