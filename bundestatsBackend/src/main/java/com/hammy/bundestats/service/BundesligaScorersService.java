package com.hammy.bundestats.service;

import com.hammy.bundestats.pojo.BundesligaScorers;
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
public class BundesligaScorersService {

    @Value("${football.apiKey}")
    private String apiKey;

    private final String API_URL = "https://api.football-data.org/v4";

    @Autowired
    private RestTemplate restTemplate;

    @Cacheable(value = "bundesligaScorers", key = "(#season != null ? #season : 'default')", unless = "#result == null")
    public BundesligaScorers getScorers(Long season) {

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-AUTH-TOKEN", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        StringBuilder urlBuilder = new StringBuilder(API_URL + "/competitions/BL1/scorers?");
        if (season != null) urlBuilder.append("season=").append(season);

        ResponseEntity<BundesligaScorers> response = restTemplate.exchange(
                urlBuilder.toString(),
                HttpMethod.GET,
                entity,
                BundesligaScorers.class
        );

        BundesligaScorers body = response.getBody();
        return body;
    }
}
