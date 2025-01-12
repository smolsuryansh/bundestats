package com.hammy.bundestats.controller;

import com.hammy.bundestats.pojo.BundesligaStats;
import com.hammy.bundestats.pojo.BundesligaTeam;
import com.hammy.bundestats.pojo.BundesligaTeamStats;
import com.hammy.bundestats.service.BundesligaStatsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BundesligaStatsController {

    private final BundesligaStatsService bundesligaStatsService;

    public BundesligaStatsController(BundesligaStatsService bundesligaStatsService) {
        this.bundesligaStatsService = bundesligaStatsService;
    }

    @GetMapping("/teams")
    public ResponseEntity<BundesligaTeamStats> getTeams(
            @RequestParam(required = false) Long season
    ) {
        BundesligaTeamStats teams = bundesligaStatsService.getTeams(season);

        return new ResponseEntity<>(teams, HttpStatus.OK);
    }

    @GetMapping("/teams/{teamId}")
    public ResponseEntity<BundesligaTeam> getTeamById(@PathVariable Long teamId) {
        BundesligaTeam team = bundesligaStatsService.getTeamById(teamId);

        return new ResponseEntity<>(team, HttpStatus.OK);
    }

    @GetMapping("/standings")
    public ResponseEntity<BundesligaStats> getStandings(
        @RequestParam(required = false) Long season
    ) {
        BundesligaStats standings = bundesligaStatsService.getStandings(season);

        return new ResponseEntity<>(standings, HttpStatus.OK);
    }
}
