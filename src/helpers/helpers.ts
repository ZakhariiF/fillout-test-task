import { FilterClause, Submission } from "../types/types";

const dateTypes = ["DatePicker", "DateTimePicker", "TimePicker"];

export const filterSubmissions = (
  submissions: Submission[],
  filters: FilterClause[]
) => {
  return submissions.filter((submission) => {
    return filters.every((filter) => {
      const question = submission.questions.find((q) => q.id === filter.id);

      if (!question) return false;

      switch (filter.condition) {
        case "equals":
          return question.value === filter.value;
        case "does_not_equal":
          return question.value !== filter.value;
        case "greater_than":
          if (
            dateTypes.includes(question.type) &&
            typeof filter.value === "string" &&
            question.value
          ) {
            return new Date(question.value) > new Date(filter.value);
          }
          return (
            typeof question.value === "number" &&
            typeof filter.value === "number" &&
            question.value > filter.value
          );
        case "less_than":
          if (
            dateTypes.includes(question.type) &&
            typeof filter.value === "string" &&
            question.value
          ) {
            return new Date(question.value) < new Date(filter.value);
          }
          return (
            typeof question.value === "number" &&
            typeof filter.value === "number" &&
            question.value < filter.value
          );
        default:
          return false;
      }
    });
  });
};
