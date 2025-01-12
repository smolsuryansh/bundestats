package com.hammy.bundestats.pojo;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

@Data
public class BundesligaScorers implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    public int count;
    public Filters filters;
    public Competition competition;
    public Season season;
    public ArrayList<Scorer> scorers;

    @Data
    public static class Competition implements Serializable {
        public int id;
        public String name;
        public String code;
        public String type;
        public String emblem;
    }

    @Data
    public static class Filters implements Serializable {
        public String season;
        public int limit;
    }

    @Data
    public static class Player implements Serializable {
        public int id;
        public String name;
        public String firstName;
        public String lastName;
        public String dateOfBirth;
        public String nationality;
        public String section;
        public Object position;
        public Object shirtNumber;
        public Date lastUpdated;
    }

    @Data
    public static class Scorer implements Serializable {
        public Player player;
        public Team team;
        public int playedMatches;
        public int goals;
        public int assists;
        public int penalties;
    }

    @Data
    public static class Season implements Serializable {
        public int id;
        public String startDate;
        public String endDate;
        public int currentMatchday;
        public Object winner;
    }

    @Data
    public static class Team implements Serializable {
        public int id;
        public String name;
        public String shortName;
        public String tla;
        public String crest;
        public String address;
        public String website;
        public int founded;
        public String clubColors;
        public String venue;
        public Date lastUpdated;
    }

}
