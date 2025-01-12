package com.hammy.bundestats.pojo;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;

@Getter
@Setter
public class BundesligaStats implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    public Filters filters;
    public Area area;
    public Competition competition;
    public Season season;
    public ArrayList<Standing> standings;


    @Data
    public static class Area implements Serializable {
        public int id;
        public String name;
        public String code;
        public String flag;
    }

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
    }

    @Data
    public static class Season implements Serializable {
        public int id;
        public String startDate;
        public String endDate;
        public int currentMatchday;
        public Object winner;
        public ArrayList<String> stages;
    }

    @Data
    public static class Standing implements Serializable {
        public String stage;
        public String type;
        public Object group;
        public ArrayList<Table> table;
    }

    @Data
    public static class Table implements Serializable {
        public int position;
        public Team team;
        public int playedGames;
        public String form;
        public int won;
        public int draw;
        public int lost;
        public int points;
        public int goalsFor;
        public int goalsAgainst;
        public int goalDifference;
    }

    @Data
    public static class Team implements Serializable {
        public int id;
        public String name;
        public String shortName;
        public String tla;
        public String crest;
    }
}
