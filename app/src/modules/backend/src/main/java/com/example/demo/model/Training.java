package com.example.demo.model;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

public class Training {
    private final UUID id;
    private String name;
    private String description;
    private List<Ingredient> ingredients;

    public Training(UUID id, String name, String description, List<Ingredient> ingredients) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public List<Ingredient> getIngredients() {
        return Collections.unmodifiableList(ingredients);
    }

    public static class Ingredient {
        private String name;
        private Integer amount;

        public Ingredient(String name, Integer amount) {
            this.name = name;
            this.amount = amount;
        }

        public String getName() {
            return name;
        }

        public Integer getAmount() {
            return amount;
        }
    }
}
