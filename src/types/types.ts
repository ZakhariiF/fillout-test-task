export interface FilterClause {
  id: string;
  condition: "equals" | "does_not_equal" | "greater_than" | "less_than";
  value: number | string;
}

export interface Submission {
  submissionId: string;
  submissionTime: string;
  lastUpdatedAt: string;
  questions: Question[];
}

export interface Question {
  id: string;
  name: string;
  type: string;
  value: string;
}
