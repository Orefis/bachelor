package com.example.demo.api.trainings;

import java.util.List;
import java.util.UUID;

public record GetTrainingsResponse(
  List<Training> trainings
) {
  record Training(
    UUID id,
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
}
