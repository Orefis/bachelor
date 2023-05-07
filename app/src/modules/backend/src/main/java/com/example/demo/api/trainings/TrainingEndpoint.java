package com.example.demo.api.trainings;

import com.example.demo.model.Training;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping(
  value = "/api"
)
class TrainingEndpoint {
  private final Map<UUID, Training> trainings = new LinkedHashMap<>();


  @PutMapping(
    value = "/trainings/{id}",
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<Void> createOrUpdate(@PathVariable("id") UUID id, @RequestBody CreateTrainingRequest request) {
    Training newTraining = new Training(
      id,
      request.name(),
      request.description(),
      request.ingredients()
        .stream()
        .map(it -> new Training.Ingredient(
          it.name(),
          it.amount()
        ))
        .toList()
    );

    trainings.put(newTraining.getId(), newTraining);

    return ResponseEntity.created(URI.create(newTraining.getId().toString()))
      .build();
  }

  @GetMapping(
    value = "/trainings",
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public GetTrainingsResponse findAll() {
    List<GetTrainingsResponse.Training> mappedTrainings = trainings.values()
      .stream()
      .map(it -> new GetTrainingsResponse.Training(
        it.getId(),
        it.getName(),
        it.getDescription(),
        it.getIngredients()
          .stream()
          .map(ingredient -> new GetTrainingsResponse.Training.Ingredient(
            ingredient.getName(),
            ingredient.getAmount()
          ))
          .toList()
      ))
      .toList();

    return new GetTrainingsResponse(mappedTrainings);
  }

  @DeleteMapping(value = "/trainings/{id}")
  public ResponseEntity<Void> delete(@PathVariable("id") UUID id) {
    if (trainings.remove(id) != null) {
      return ResponseEntity.ok().build();
    } else {
      return ResponseEntity.noContent().build();
    }
  }
}

