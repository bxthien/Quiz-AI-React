import axios from "axios";
import quizPromptFormat, { QuizAIProb } from "../constrains/GemeniQuizAIPrompt";

const extractJson = (response: string) => {
  try {
    // Loại bỏ markdown ```json ... ```
    const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
    const cleanedJson = jsonMatch ? jsonMatch[1] : response; // Lấy phần JSON bên trong

    return JSON.parse(cleanedJson); // Chuyển thành JSON object
  } catch (error) {
    console.error("Lỗi khi xử lý JSON:", error);
    return null;
  }
};
const requestAPI = async ({ prop }: { prop: QuizAIProb }) => {
  try {
    const reqData = quizPromptFormat({ prop }).trim().replace(/\s+/g, " ");
    const response = await axios.post(
      import.meta.env.VITE_GEMINI_URL,
      {
        contents: [
          {
            parts: [
              {
                text: reqData,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const quizData = response.data.candidates[0].content.parts[0].text;
    const validJsonString = extractJson(quizData);
    return validJsonString;
  } catch (err) {
    return "Error response Data " + err;
  }
};
export default requestAPI;
