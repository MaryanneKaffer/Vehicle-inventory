package com.maryannekaffer.vehicle_inventory.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cron")
public class CronController {

    @Value("${cron.secret}")
    private String cronSecret;

    @GetMapping("/execute")
    public ResponseEntity<?> executar(
            @RequestHeader("X-Cron-Secret") String secret) {

        if (!secret.equals(cronSecret)) {
            return ResponseEntity.status(403).body("Unauthorized");
        }

        return ResponseEntity.ok("");
    }
}
