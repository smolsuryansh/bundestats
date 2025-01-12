package com.hammy.bundestats.service;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

@SpringBootTest
public class RedisTest {

    @Autowired
    private RedisTemplate redisTemplate;

    @Disabled
    @Test
    void testRedis() {
        redisTemplate.opsForValue().set("name", "Hammy");
        Object test = redisTemplate.opsForValue().get("money");
        System.out.println(test);
    }

}
