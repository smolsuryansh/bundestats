package com.hammy.bundestats.pojo;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

@Data
public class BundesligaMatchesById implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    public Area area;
    public Competition competition;
    public Season season;
    public int id;
    public Date utcDate;
    public String status;
    public int minute;
    public int injuryTime;
    public int attendance;
    public String venue;
    public int matchday;
    public String stage;
    public Object group;
    public Date lastUpdated;
    public HomeTeam homeTeam;
    public AwayTeam awayTeam;
    public Score score;
    public ArrayList<Goal> goals;
    public ArrayList<Object> penalties;
    public ArrayList<Booking> bookings;
    public ArrayList<Substitution> substitutions;
    public Odds odds;
    public ArrayList<Referee> referees;

    @Data
    public static class Area implements Serializable {
        public int id;
        public String name;
        public String code;
        public String flag;
    }

    @Data
    public static class Assist implements Serializable {
        public int id;
        public String name;
    }

    @Data
    public static class AwayTeam implements Serializable {
        public int id;
        public String name;
        public String shortName;
        public String tla;
        public String crest;
        public Coach coach;
        public Object leagueRank;
        public String formation;
        public ArrayList<Lineup> lineup;
        public ArrayList<Bench> bench;
        public Statistics statistics;
    }

    @Data
    public static class Bench implements Serializable {
        public int id;
        public String name;
        public String position;
        public int shirtNumber;
    }

    @Data
    public static class Booking implements Serializable {
        public int minute;
        public Team team;
        public Player player;
        public String card;
    }

    @Data
    public static class Coach implements Serializable {
        public int id;
        public String name;
        public String nationality;
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
    public static class FullTime implements Serializable {
        public int home;
        public int away;
    }

    @Data
    public static class Goal implements Serializable {
        public int minute;
        public Object injuryTime;
        public String type;
        public Team team;
        public Scorer scorer;
        public Assist assist;
        public Score score;
    }

    @Data
    public static class HalfTime implements Serializable {
        public int home;
        public int away;
    }

    @Data
    public static class HomeTeam implements Serializable {
        public int id;
        public String name;
        public String shortName;
        public String tla;
        public String crest;
        public Coach coach;
        public Object leagueRank;
        public String formation;
        public ArrayList<Lineup> lineup;
        public ArrayList<Bench> bench;
        public Statistics statistics;
    }

    @Data
    public static class Lineup implements Serializable {
        public int id;
        public String name;
        public String position;
        public int shirtNumber;
    }

    @Data
    public static class Odds implements Serializable {
        public double homeWin;
        public double draw;
        public double awayWin;
    }

    @Data
    public static class Player implements Serializable {
        public int id;
        public String name;
    }

    @Data
    public static class PlayerIn implements Serializable {
        public int id;
        public String name;
    }

    @Data
    public static class PlayerOut implements Serializable {
        public int id;
        public String name;
    }

    @Data
    public static class Referee implements Serializable {
        public int id;
        public String name;
        public String type;
        public String nationality;
    }

    @Data
    public static class Score implements Serializable {
        public String winner;
        public String duration;
        public FullTime fullTime;
        public HalfTime halfTime;
        public int home;
        public int away;
    }

    @Data
    public static class Scorer implements Serializable {
        public int id;
        public String name;
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
    public static class Statistics implements Serializable {
        public int corner_kicks;
        public int free_kicks;
        public int goal_kicks;
        public int offsides;
        public int fouls;
        public int ball_possession;
        public int saves;
        public int throw_ins;
        public int shots;
        public int shots_on_goal;
        public int shots_off_goal;
        public int yellow_cards;
        public int yellow_red_cards;
        public int red_cards;
    }

    @Data
    public static class Substitution implements Serializable {
        public int minute;
        public Team team;
        public PlayerOut playerOut;
        public PlayerIn playerIn;
    }

    @Data
    public static class Team implements Serializable {
        public int id;
        public String name;
    }
}
