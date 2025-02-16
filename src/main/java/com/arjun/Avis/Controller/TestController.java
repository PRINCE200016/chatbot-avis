package com.arjun.Avis.Controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "http://localhost:8080") // Replace with your front end URL
public class TestController {

    @GetMapping
    public String testApi() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = "http://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY"; // Replace with a valid API key
            String response = restTemplate.getForObject(url, String.class);
            System.out.println("API Response: " + response);
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to call the API.";
        }
    }
}
