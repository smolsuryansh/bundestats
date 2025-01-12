package com.hammy.bundestats.controller;

import com.hammy.bundestats.pojo.BundesligaMatches;
import com.hammy.bundestats.pojo.BundesligaMatchesById;
import com.hammy.bundestats.service.BundesligaMatchesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BundesligaMatchesController {

    private final BundesligaMatchesService bundesligaMatchesService;

    private final Long MAX_LIMIT = 10L;

    public BundesligaMatchesController(BundesligaMatchesService bundesligaMatchesService) {
        this.bundesligaMatchesService = bundesligaMatchesService;
    }

    @GetMapping("/matches")
    public ResponseEntity<BundesligaMatches> getMatches(
            @RequestParam(required = false) Long season,
            @RequestParam(required = false) String status
    ) {
        BundesligaMatches matches = bundesligaMatchesService.getMatches(season, status);

        return new ResponseEntity<>(matches, HttpStatus.OK);
    }

    @GetMapping("/matches/{matchId}")
    public ResponseEntity<BundesligaMatchesById> getMatchById(
            @PathVariable Long matchId
    ) {
        BundesligaMatchesById matches = bundesligaMatchesService.getMatchById(matchId);

        return new ResponseEntity<>(matches, HttpStatus.OK);
    }

    @GetMapping("/teams/{teamId}/matches")
    public ResponseEntity<BundesligaMatches> getMatchesByTeam(
            @PathVariable Long teamId,
            @RequestParam(required = false) Long season,
            @RequestParam(required = false) String status
    ) {
        if (teamId != null) {
            BundesligaMatches matchesByTeam = bundesligaMatchesService.getMatchesByTeam(teamId, season, status);

            return new ResponseEntity<>(matchesByTeam, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/persons/{playerId}/matches")
    public ResponseEntity<BundesligaMatches> getMatchesByPlayer(
            @PathVariable Long playerId,
            @RequestParam(defaultValue = "5") Long limit,
            @RequestParam(required = false) String status
    ) {
        if (playerId != null) {
            if (limit > MAX_LIMIT) {
                limit = MAX_LIMIT;
            }

            BundesligaMatches matches = bundesligaMatchesService.getMatchesByPlayer(playerId, limit, status);

            return new ResponseEntity<>(matches, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/matches/{matchId}/head2head")
    public ResponseEntity<BundesligaMatches> getHeadToHeadMatches(
            @PathVariable Long matchId,
            @RequestParam(defaultValue = "5") Long limit
    ) {
        if (matchId != null) {
            if (limit > MAX_LIMIT) {
                limit = MAX_LIMIT;
            }

            BundesligaMatches matches = bundesligaMatchesService.getHeadToHeadMatches(matchId, limit);

            return new ResponseEntity<>(matches, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
