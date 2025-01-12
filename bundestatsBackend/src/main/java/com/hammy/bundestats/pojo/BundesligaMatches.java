package com.hammy.bundestats.pojo;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;


@Getter
@Setter
public class BundesligaMatches implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    public Competition competition;
    public Filters filters;
    public ResultSet resultSet;
    public ArrayList<Match> matches;

    @Data
    public static class Area implements Serializable {

        public int id;
        public String name;
        public String code;
        public String flag;

    }

    @Data
    public static class AwayTeam implements Serializable {

        public int id;
        public String name;
        public String shortName;
        public String tla; // example: BO4 for bayer leverkusen
        public String crest; // logo

    }

    @Data
    public static class HomeTeam implements Serializable {

        public int id;
        public String name;
        public String shortName;
        public String tla;
        public String crest;

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
    public static class FullTime implements Serializable {

        public int home;
        public int away;

    }

    @Data
    public static class HalfTime implements Serializable {

        public int home;
        public int away;

    }

    @Data
    public static class Match implements Serializable {

        public Area area;
        public Competition competition;
        public Season season;
        public int id;
        public Date utcDate;
        public String status;
        public int matchday;
        public String stage;
        public Object group;
        public Date lastUpdated;
        public HomeTeam homeTeam;
        public AwayTeam awayTeam;
        public Score score;
        public ArrayList<Referee> referees;

    }

    @Data
    public static class Referee implements Serializable {

        public int id;
        public String name;
        public String type;
        public String nationality;

    }

    @Data
    public static class ResultSet implements Serializable {

        public int count;
        public String first;
        public String last;
        public int played;

    }

    @Data
    public static class Score implements Serializable {

        public String winner;
        public String duration;
        public FullTime fullTime;
        public HalfTime halfTime;

    }

    @Data
    public static class Season implements Serializable {

        public int id;
        public String startDate;
        public String endDate;
        public int currentMatchday;
        public Object winner;

    }

}
