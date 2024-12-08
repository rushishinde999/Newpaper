package com.example.demo;


import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor

public class News {

	
    private int id;
    private String title;
    private String description;
    private String image;
}
