package com.arjun.Avis.Contoller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private static final Map<String, String> responses = new HashMap<>();

    static {
        responses.put("hello", "Hello! How can I assist you?");
        responses.put("hi", "Hi there! What do you need help with?");
        responses.put("how are you", "I'm just a bot, but I'm doing great! How about you?");
        responses.put("bye", "Goodbye! Have a great day!");
    }

    @GetMapping
    public String defaultResponse() {
        return "Welcome to A.V.I.S Chatbot!";
    }

    @PostMapping
    public Map<String, String> chat(@RequestBody Map<String, String> request) {
        String userInput = request.get("message").toLowerCase();
        String response = responses.getOrDefault(userInput, "I'm not sure how to respond to that.");
        
        Map<String, String> result = new HashMap<>();
        result.put("response", response);
        return result;
    }
}
