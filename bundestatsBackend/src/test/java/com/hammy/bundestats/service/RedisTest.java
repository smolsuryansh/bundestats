package com.hammy.bundestats.service;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

@SpringBootTest
public class RedisTest {

    @Autowired
    private RedisTemplate redisTemplate;

    @Test
    void testRedis() {
        redisTemplate.opsForValue().set("name", "Surya");
        Object test = redisTemplate.opsForValue().get("name");
        System.out.println(test);
    }

    @Value("${REDIS.URL}")
    private String redisURL;

    @Test
    void logRedisConfig() {
        System.out.println("REDIS HOST: " + System.getenv("REDIS.HOST"));
        System.out.println("REDIS URL: " + redisURL);
        System.out.println("REDIS PASSWORD: " + System.getenv("REDIS.PASSWORD"));
    }

}
