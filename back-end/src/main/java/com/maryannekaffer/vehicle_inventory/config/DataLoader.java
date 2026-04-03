package com.maryannekaffer.vehicle_inventory.config;

import java.io.InputStream;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.maryannekaffer.vehicle_inventory.entity.User;
import com.maryannekaffer.vehicle_inventory.entity.Vehicle;
import com.maryannekaffer.vehicle_inventory.repository.UserRepository;
import com.maryannekaffer.vehicle_inventory.repository.VehicleRepository;

import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

@Configuration
public class DataLoader {

    @Bean
    @SuppressWarnings("unused")
    CommandLineRunner loadData(VehicleRepository vehicleRepository, UserRepository userRepository) {
        return args -> {
            if (vehicleRepository.count() > 0)
                return;

            User defaultOwner = new User();
            defaultOwner.setUsername("Auto");
            defaultOwner.setEmail("admin@email.com");
            defaultOwner.setPassword("123456");

            userRepository.save(defaultOwner);

            ObjectMapper mapper = new ObjectMapper();
            InputStream inputStream = getClass().getResourceAsStream("/data.json");

            List<Vehicle> vehicles = mapper.readValue(
                    inputStream,
                    new TypeReference<List<Vehicle>>() {
                    });

            vehicles.forEach(vehicle -> {
                vehicle.setOwner(defaultOwner);
            });

            vehicleRepository.saveAll(vehicles);
        };
    }
}