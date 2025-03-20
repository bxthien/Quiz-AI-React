import { Alert, Form, Input, Select } from "antd";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useQuizData } from "../../context/QuizContext";
import { QuizAIProb } from "../../constrains/GemeniQuizAIPrompt";
import requestAPI from "../../services/GeminiApi";
import { useLoadingContext } from "../../context/LoadingContext";
const { Option } = Select;

const QuizInputForm = () => {
  const { isLoading, loading, stopLoading } = useLoadingContext();
  const [error, setError] = useState<string | null>(null);
  const initData: QuizAIProb = {
    topic: "",
    amount: "10",
    selectedLevel: "Low",
    language: "Vietnamese",
  };
  const { quizData, setQuizData, removeQuiz } = useQuizData();
  const showError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 300000);
  };
  const handleSubmit = async (values: QuizAIProb) => {
    loading();
    try {
      removeQuiz();
      const jsonData = await requestAPI({ prop: values });
      if (jsonData.error || jsonData[0].error) {
        showError("Your topic is dump!!!");
      } else {
        setQuizData(jsonData);
        console.log(jsonData);
      }
    } catch (err) {
    } finally {
      stopLoading();
    }
  };

  const validateTopic = (_: any, value: any) => {
    if (!value || value.trim().length < 3) {
      return Promise.reject("Topic must have at least 3 characters!");
    }
    if (/[^a-zA-Z0-9\u00C0-\u1EF9\s]/.test(value)) {
      return Promise.reject("The topic must not contain special characters!");
    }
    return Promise.resolve();
  };
  const validateNumber = (_: any, value: any) => {
    if (!value || (value as number) > 10) {
      return Promise.reject("The number of questions must be less than 11.");
    }
    return Promise.resolve();
  };
  return (
    <Form layout="vertical" initialValues={initData} onFinish={handleSubmit}>
      <Form.Item
        name="topic"
        label="Topic"
        rules={[
          { required: true, message: "Please enter a topic!" },
          { validator: validateTopic },
        ]}
      >
        <Input placeholder="Enter topic..." />
      </Form.Item>

      <Form.Item name="selectedLevel" label="Levels">
        <Select>
          <Option value="Easy">Easy</Option>
          <Option value="Medium">Medium</Option>
          <Option value="Hard">Hard</Option>
        </Select>
      </Form.Item>

      <Form.Item name="language" label="Language">
        <Select>
          <Option value="English">English</Option>
          <Option value="Vietnamese">Vietnamese</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="amount"
        label="Number"
        rules={[{ validator: validateNumber }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item layout="horizontal">
        <div className={`flex gap-2 w-full justify-around`}>
          <button
            type="submit"
            disabled={isLoading}
            className="relative w-40 h-20 flex justify-center items-center bg-transparent border-none transition-transform duration-300 hover:scale-110 active:scale-90 "
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="absolute text-white text-3xl animate-spin" />
            ) : (
              <img
                src={
                  quizData && quizData[0]
                    ? "/re-generate.svg"
                    : "/generate-btn.svg"
                }
                alt="Submit Button"
                className="w-full h-full object-fit"
              />
            )}
          </button>
        </div>
      </Form.Item>

      {error && <Alert message={error} type="warning" />}
    </Form>
  );
};
export default QuizInputForm;
