export interface QuizAIProb {
  topic: string;
  amount: string;
  selectedLevel: string;
  language: string;
}
const sanitizeInput = (input: string) => {
  return input.replace(/[<>`"'&]/g, "");
};
const quizPromptFormat = ({ prop }: { prop: QuizAIProb }) => {
  return `Create a concise multiple-choice quiz on ${prop.topic}. Don't automatically assume it's something close if it's not valid.  Aim for fast generation.
    --- Important Validation ---

   If the ${prop.topic} looks like an ID, a random string, numbers, or contains only special characters, return:
         {
           "error": "Invalid topic. Please provide a meaningful subject, not an ID or random string."
         }
    If the ${prop.topic} is too generic (e.g., "test", "random", "123", "_", "??"), return:
         {
           "error": "Invalid topic. Please provide a well-defined and specific subject."
         }
    The ${prop.topic} must be a recognizable subject (e.g., "Physics", "Machine Learning", "World War II", "React.js").
If the topic meets the above conditions, no need to continue reading propmt, directly return error.
   If the topic does not meet the above validations, continue reading.
    Number of questions: ${prop.amount}. Each question has 4 answer choices (A, B, C, D).
    Question types:
        - 70% - Single correct answer.
        - 30% - Two or three correct answers.
        - Make sure questions are unique, not repetitive, and cover different aspects of the topic.
    For each question:
        - Provide answer choices A, B, C, and D. Keep answers brief.
        - Clearly indicate all correct answer options.
        - Write very short explanations (1 sentence max) for each correct answer, focusing on the core reason.
    
    Difficulty level: ${prop.selectedLevel} (e.g., beginner, intermediate, advanced. Beginner=basic facts, Advanced=complex concepts).
    Output format:  A valid JSON array structured as follows:
    [
      {
        "question": "Question text (brief)",
        "answers": { "A": "Option 1 (short)", "B": "Option 2 (short)", "C": "Option 3 (short)", "D": "Option 4 (short)" },
        "correct_answers": ["A"],
        "short_explain_for_answer": {
          "A": "Explanation for A (very short)"
        }
      },
      {
        "question": "Question text (brief)",
        "answers": { "A": "Option 1 (short)", "B": "Option 2 (short)", "C": "Option 3 (short)", "D": "Option 4 (short)" },
        "correct_answers": ["A", "B", "C"],
        "short_explain_for_answer": {
          "A": "Explanation for A (very short)",
          "B": "Explanation for B (very short)",
          "C": "Explanation for C (very short)"
        }
      }
    ]
  
    If ${prop.topic} is valid with validation, return:
    Generate the quiz in ${prop.language}.Check the accuracy of your answers, and correct them if they are incorrect.
    IMPORTANT:  Return ONLY a valid JSON array. No extra text, no explanations outside the JSON, no comments. Ensure fast response.
    `;
};
export default quizPromptFormat;
