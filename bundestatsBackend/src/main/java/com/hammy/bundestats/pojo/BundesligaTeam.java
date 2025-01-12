package com.hammy.bundestats.pojo;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

@Data
public class BundesligaTeam implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

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
    public static class Contract implements Serializable {
        public String start;
        public String until;
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
    public static class Squad implements Serializable {
        public int id;
        public String name;
        public String position;
        public String dateOfBirth;
        public String nationality;
    }

}
