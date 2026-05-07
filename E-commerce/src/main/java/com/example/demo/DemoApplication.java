package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class DemoApplication {
	public String home() {
		return "Hello World from Spring Boot!";
	}

	public static void main(String[] args) {
		System.out.println("helloworld");
		SpringApplication.run(DemoApplication.class, args);
	}

}

