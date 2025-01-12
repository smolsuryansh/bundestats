package com.hammy.bundestats.controller;

import com.hammy.bundestats.pojo.BundesligaScorers;
import com.hammy.bundestats.service.BundesligaScorersService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BundesligaScorersController {

    private final BundesligaScorersService bundesligaScorersService;

    public BundesligaScorersController(BundesligaScorersService bundesligaScorersService) {
        this.bundesligaScorersService = bundesligaScorersService;
    }

    @GetMapping("/scorers")
    public ResponseEntity<BundesligaScorers> getScorers(
            @RequestParam(required = false) Long season
    ) {
        BundesligaScorers scorers = bundesligaScorersService.getScorers(season);

        return ResponseEntity.ok(scorers);
    }

}
