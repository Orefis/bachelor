package com.example.demo.api.trainings;

import java.util.List;

public record CreateTrainingRequest(
  String name,
  String description,
  List<Ingredient> ingredients
) {
  record Ingredient(
    String name,
    Integer amount
  ) {
  }
}
