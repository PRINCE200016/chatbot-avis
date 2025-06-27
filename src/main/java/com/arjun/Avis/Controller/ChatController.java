package com.arjun.Avis.Controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;
import org.json.JSONArray;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*") // Updated to allow requests from React frontend
public class ChatController {

    // ✅ Load Gemini API Key & URL from application.properties
    @Value("${GEMINI_API_KEY}")
    private String geminiApiKey;

    @Value("${GEMINI_API_URL}")
    private String geminiApiUrl;

    // ✅ POST Endpoint without Authorization Check
    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> getChatResponse(
            @RequestBody(required = false) Map<String, Object> request) {

        // 🟡 1. Validate Request Body for 'message'
        if (request == null || !request.containsKey("message") || request.get("message") == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "⚠️ Missing 'message' field"));
        }

        // 🟡 2. Capture User Message
        String userMessage = request.get("message").toString();
        System.out.println("👤 User Message: " + userMessage);

        // 🟡 3. Call Gemini API for Actual Response
        try {
            RestTemplate restTemplate = new RestTemplate();

            // ✅ Create Gemini JSON Request
            JSONObject requestBody = new JSONObject();
            requestBody.put("contents", List.of(
                    Map.of("parts", List.of(
                            Map.of("text", userMessage)
                    ))
            ));

            // ✅ Gemini API Headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // ✅ Gemini API URL with Key Parameter
            String url = geminiApiUrl + "?key=" + geminiApiKey;
            System.out.println("🌐 Gemini API URL: " + url);

            HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);

            // ✅ Send Request to Gemini
            ResponseEntity<String> apiResponse = restTemplate.exchange(
                    url, HttpMethod.POST, entity, String.class);

            // 🟡 4. Logging Gemini API Response
            System.out.println("Gemini Response Status: " + apiResponse.getStatusCode());
            System.out.println("Gemini Response Body: " + apiResponse.getBody());

            // 🟡 5. Parse Gemini API Response
            JSONObject jsonResponse = new JSONObject(apiResponse.getBody());
            JSONArray candidates = jsonResponse.optJSONArray("candidates");

            String botResponse = "No response from Gemini.";
            if (candidates != null && candidates.length() > 0) {
                botResponse = candidates.getJSONObject(0)
                        .getJSONObject("content")
                        .getJSONArray("parts")
                        .getJSONObject(0)
                        .getString("text")
                        .trim();
            }

            // 🟡 6. Return Response
            System.out.println("🤖 Gemini Bot Response: " + botResponse);
            return ResponseEntity.ok(Map.of("response", botResponse));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "API Error: " + e.getMessage()));
        }
    }
}
