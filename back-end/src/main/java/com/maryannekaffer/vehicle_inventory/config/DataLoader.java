package com.maryannekaffer.vehicle_inventory.config;

import com.maryannekaffer.vehicle_inventory.entity.Vehicle;
import com.maryannekaffer.vehicle_inventory.repository.VehicleRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;
import java.util.List;

import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

@Configuration
public class DataLoader {

    @Bean
    @SuppressWarnings("unused")
    CommandLineRunner loadData(VehicleRepository repository) {
        return args -> {

            if (repository.count() > 0) return;

            ObjectMapper mapper = new ObjectMapper();

            InputStream inputStream = getClass()
                    .getResourceAsStream("/data.json");

            List<Vehicle> vehicles = mapper.readValue(
                    inputStream,
                    new TypeReference<List<Vehicle>>() {}
            );

            repository.saveAll(vehicles);
        };
    }
}