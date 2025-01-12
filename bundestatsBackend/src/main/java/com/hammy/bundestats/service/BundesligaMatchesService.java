package com.hammy.bundestats.service;

import com.hammy.bundestats.pojo.BundesligaMatches;
import com.hammy.bundestats.pojo.BundesligaMatchesById;
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
public class BundesligaMatchesService {

    @Value("${football.apiKey}")
    private String apiKey;

    private final String API_URL = "https://api.football-data.org/v4";

    @Autowired
    private RestTemplate restTemplate;

    @Cacheable(value = "bundesligaMatches", key = "(#season != null ? #season : 'default') + '-' + (#status != null ? #status : 'all')", unless = "#result == null")
    public BundesligaMatches getMatches(Long season, String status) {

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-AUTH-TOKEN", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        StringBuilder urlBuilder = new StringBuilder(API_URL + "/competitions/BL1/matches?");
        if(season != null) urlBuilder.append("season=").append(season).append("&");
        if(status != null) urlBuilder.append("status=").append(status).append("&");

        ResponseEntity<BundesligaMatches> response = restTemplate.exchange(
                urlBuilder.toString(),
                HttpMethod.GET,
                entity,
                BundesligaMatches.class
        );

        BundesligaMatches body = response.getBody();
        return body;
    }

    @Cacheable(value = "bundesligaMatchesById", key = "#matchId != null ? #matchId : 'unknown'", unless = "#result == null")
    public BundesligaMatchesById getMatchById(Long matchId) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-AUTH-TOKEN", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<BundesligaMatchesById> response = restTemplate.exchange(
                API_URL + "/matches/" + matchId,
                HttpMethod.GET,
                entity,
                BundesligaMatchesById.class
        );

        BundesligaMatchesById body = response.getBody();
        return body;
    }

    @Cacheable(value = "bundesligaMatchesByTeam", key = "(#teamId != null ? #teamId : 'default') + '-' + (#season != null ? #season : 'default') + '-' + (#status != null ? #status : 'all')", unless = "#result == null")
    public BundesligaMatches getMatchesByTeam(Long teamId, Long season, String status) {

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-AUTH-TOKEN", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        StringBuilder urlBuilder = new StringBuilder(API_URL + "/teams/" + teamId + "/matches?");
        if (season != null) urlBuilder.append("season=").append(season);
        if (status != null && status.isEmpty()) urlBuilder.append("status=").append(status);

        ResponseEntity<BundesligaMatches> response = restTemplate.exchange(
                urlBuilder.toString(),
                HttpMethod.GET,
                entity,
                BundesligaMatches.class
        );

        BundesligaMatches body = response.getBody();
        return body;
    }

    @Cacheable(value = "bundesligaMatchesByPlayer", key = "(#playerId != null ? #playerId : 'unknown') + '-' + (#limit != null ? #limit : 10) + '-' + (#status != null ? #status : 'all')", unless = "#result == null")
    public BundesligaMatches getMatchesByPlayer(Long playerId, Long limit, String status) {

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-AUTH-TOKEN", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        StringBuilder urlBuilder = new StringBuilder(API_URL + "/persons/" + playerId + "/matches?limit=" + limit);
        if (status != null && !status.isEmpty()) urlBuilder.append("status=").append(status);

        ResponseEntity<BundesligaMatches> response = restTemplate.exchange(
                urlBuilder.toString(),
                HttpMethod.GET,
                entity,
                BundesligaMatches.class
        );

        BundesligaMatches body = response.getBody();
        return body;
    }

    @Cacheable(value = "bundesligaHead2Head", key = "(#matchId != null ? #matchId : 'unknown') + '-' + (#limit != null ? #limit : 5)", unless = "#result == null")
    public BundesligaMatches getHeadToHeadMatches(Long matchId, Long limit) {

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-AUTH-TOKEN", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<BundesligaMatches> response = restTemplate.exchange(
                API_URL + "/matches/" + matchId + "/head2head?limit=" + limit,
                HttpMethod.GET,
                entity,
                BundesligaMatches.class
        );

        BundesligaMatches body = response.getBody();
        return body;
    }
}
