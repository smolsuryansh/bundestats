package com.hammy.bundestats.service;

import com.hammy.bundestats.pojo.BundesligaStats;
import com.hammy.bundestats.pojo.BundesligaTeam;
import com.hammy.bundestats.pojo.BundesligaTeamStats;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class BundesligaStatsService {

    @Value("${football.apiKey}")
    private String apiKey;

    private final String API_URL = "https://api.football-data.org/v4";

    @Autowired
    private RestTemplate restTemplate;

    @Cacheable(value = "bundesligaTeams", key = "#season != null ? #season : 'default'", unless = "#result == null")
    public BundesligaTeamStats getTeams(Long season) {

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-AUTH-TOKEN", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        StringBuilder urlBuilder = new StringBuilder(API_URL + "/competitions/BL1/teams?");
        if (season != null) urlBuilder.append("season=").append(season);

        ResponseEntity<BundesligaTeamStats> response = restTemplate.exchange(
                urlBuilder.toString(),
                HttpMethod.GET,
                entity,
                BundesligaTeamStats.class
        );

        BundesligaTeamStats body = response.getBody();
        return body;
    }

    @Cacheable(value = "bundesligaTeamById", key = "#teamId", unless = "#result == null")
    public BundesligaTeam getTeamById(Long teamId) {

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-AUTH-TOKEN", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<BundesligaTeam> response = restTemplate.exchange(
            API_URL + "/teams/" + teamId,
                HttpMethod.GET,
                entity,
                BundesligaTeam.class
        );

        BundesligaTeam body = response.getBody();
        return body;
    }

    @Cacheable(value = "bundesligaStandings", key = "#season != null ? #season : 'default'", unless = "#result == null")
    public BundesligaStats getStandings(Long season) {

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-AUTH-TOKEN", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        StringBuilder urlBuilder = new StringBuilder(API_URL + "/competitions/BL1/standings?");
        if (season != null) urlBuilder.append("season=").append(season).append("&");

        ResponseEntity<BundesligaStats> response = restTemplate.exchange(
                urlBuilder.toString(),
                HttpMethod.GET,
                entity,
                BundesligaStats.class
        );

        BundesligaStats body = response.getBody();
        return body;
    }
}
