package com.hammy.bundestats.pojo;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

@Data
public class BundesligaTeamStats implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    public int count;
    public Filters filters;
    public Competition competition;
    public Season season;
    public ArrayList<Team> teams;

    @Data
    public static class Area implements Serializable {
        public int id;
        public String name;
        public String code;
        public String flag;
    }

    @Data
    public static class Coach implements Serializable {
        public int id;
        public String firstName;
        public String lastName;
        public String name;
        public String dateOfBirth;
        public String nationality;
        public Contract contract;
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
    public static class Contract implements Serializable {
        public String start;
        public String until;
    }

    @Data
    public static class Filters implements Serializable {
        public String season;
    }

    @Data
    public static class RunningCompetition implements Serializable {
        public int id;
        public String name;
        public String code;
        public String type;
        public String emblem;
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
    public static class Squad implements Serializable {
        public int id;
        public String name;
        public String position;
        public String dateOfBirth;
        public String nationality;
    }

    @Data
    public static class Team implements Serializable {
        public Area area;
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
        public ArrayList<RunningCompetition> runningCompetitions;
        public Coach coach;
        public ArrayList<Squad> squad;
        public ArrayList<Object> staff;
        public Date lastUpdated;
    }

}
