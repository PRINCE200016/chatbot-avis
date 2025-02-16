package com.arjun.Avis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class AvisApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure().directory("./").filename(".env").load();
        String geminiApiKey = dotenv.get("GEMINI_API_KEY");
        System.out.println("GEMINI_API_KEY: " + geminiApiKey); // Confirm Gemini Key Loaded

        SpringApplication.run(AvisApplication.class, args);
    }
}
