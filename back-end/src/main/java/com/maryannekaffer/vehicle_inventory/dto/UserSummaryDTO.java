package com.maryannekaffer.vehicle_inventory.dto;

import java.util.UUID;

public record UserSummaryDTO(
    UUID id,
    String username,
    String email
) {}