import { Form, Input, Select, Button, Alert } from "antd";
import { useContext, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { QuizContext, useQuizData } from "../../context/QuizContext";
import { QuizAIProb } from "../../constrains/GemeniQuizAIPrompt";
import requestAPI from "../../services/GeminiApi";
import { useLoading } from "../../hooks/useLoading";
import { useLoadingContext } from "../../context/LoadingContext";
import { setInterval } from "timers";
import { useNavigate } from "react-router-dom";
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
      <Form.Item name="amount" label="Number">
        <Input type="number" />
      </Form.Item>

      <Form.Item layout="horizontal">
        <div className={`flex gap-2 w-full justify-around`}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isLoading}
            className={`${quizData && quizData[0] ? "flex-1" : "w-full"}`}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : quizData && quizData[0] ? (
              "Re-Generate"
            ) : (
              "Generate"
            )}
          </Button>

         
        </div>
      </Form.Item>

      {error ? (
        <Form.Item className="flex align-middle">{error}</Form.Item>
      ) : (
        <></>
      )}
    </Form>
  );
};
export default QuizInputForm;
