export class Calorie {
  constructor(
    public name: string,
    public age: number,
    public weight: number,
    public height: number,
    public sex: number,
    public activity: number,
    public goal: number,
  ) {

  }
  calculatedCalories(): string {
    if (this.sex == 1) {
      let sum = Math.round((65.5 + ((13.75 * this.weight) + (5.003 * this.height) - (6.775 * this.age)) * this.activity) + this.goal);
      if (this.goal == 1) {
        sum -= 300;
        return sum + ', Proteins: ' + Math.round((sum * 0.35) / 4)
          + 'g, Carbs: ' + Math.round((sum * 0.40) / 4)
          + 'g, Fat: ' + Math.round((sum * 0.25) / 9) + 'g';
      } else if (this.goal == 2) {
        return sum + ', Proteins: ' + Math.round((sum * 0.15) / 4)
          + 'g, Carbs: ' + Math.round((sum * 0.55) / 4)
          + 'g, Fat: ' + Math.round((sum * 0.30) / 9) + 'g';
      } else if (this.goal == 3) {
        sum += 300;
        return sum + ', Proteins: ' + Math.round((sum * 0.40) / 4)
          + 'g, Carbs: ' + Math.round((sum * 0.30) / 4)
          + 'g, Fat: ' + Math.round((sum * 0.30) / 9) + 'g';
      }
    } else {
      let sum = Math.round((655.1 + ((9.563 * this.weight) + (1.85 * this.height) - (4.676 * this.age)) * this.activity) + this.goal);
      if (this.goal == 1) {
        sum -= 300;
        return sum + ', Proteins: ' + Math.round((sum * 0.35) / 4)
          + 'g, Carbs: ' + Math.round((sum * 0.40) / 4)
          + 'g, Fat: ' + Math.round((sum * 0.25) / 9) + 'g';
      } else if (this.goal == 2) {
        return sum + ', Proteins: ' + Math.round((sum * 0.15) / 4)
          + 'g, Carbs: ' + Math.round((sum * 0.55) / 4)
          + 'g, Fat: ' + Math.round((sum * 0.30) / 9) + 'g';
      } else if (this.goal == 3) {
        sum += 300;
        return sum + ', Proteins: ' + Math.round((sum * 0.40) / 4)
          + 'g, Carbs: ' + Math.round((sum * 0.30) / 4)
          + 'g, Fat: ' + Math.round((sum * 0.30) / 9) + 'g';
      }
    }
  }
}
