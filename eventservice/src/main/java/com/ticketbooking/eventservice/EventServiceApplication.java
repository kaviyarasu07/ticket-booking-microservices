package com.ticketbooking.eventservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EventServiceApplication {

	public static void main(String[] args) {
        System.out.println("started");

		SpringApplication.run(EventServiceApplication.class, args);

	}

}
