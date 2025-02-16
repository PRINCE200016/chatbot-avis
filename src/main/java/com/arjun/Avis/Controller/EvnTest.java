package com.arjun.Avis.Controller;

public class EvnTest {
    public static void main(String[] args) {
        String apiKey = System.getenv("OPENAI_API_KEY");
        if (apiKey != null) {
            System.out.println("API Key is set correctly: " + apiKey);
        } else {
            System.out.println("API Key is not set or cannot be found.");
        }
    }

}
