import { Form, Input, Select, Button, Alert } from "antd";
import { useContext, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { QuizContext, useQuizData } from "../../context/QuizContext";
import { QuizAIProb } from "../../constrains/GemeniQuizAIPrompt";
import requestAPI from "../../services/GeminiApi";
const { Option } = Select;

const QuizInputForm = () => {
  const [loading, setLoading] = useState(false);
  const initData: QuizAIProb = {
    topic: "",
    amount: "10",
    selectedLevel: "Low",
    language: "Vietnamese",
  };
  const { setQuizData } = useQuizData();
  const handleSubmit = async (values: QuizAIProb) => {
    console.log("Submitted");
    const jsonData = await requestAPI({ prop: values });
    if (jsonData.error) {
      return (
        <Alert
          message="Error"
          description="This is an error message about copywriting."
          type="error"
          showIcon
        />
      );
    } else {
      setQuizData(jsonData);
      console.log(jsonData);
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
    <Form layout="vertical" onFinish={handleSubmit}>
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

      <Form.Item name="level" label="Levels">
        <Select defaultValue="Easy">
          <Option value="Easy">Easy</Option>
          <Option value="Medium">Medium</Option>
          <Option value="Hard">Hard</Option>
        </Select>
      </Form.Item>

      <Form.Item name="language" label="Language">
        <Select defaultValue="English">
          <Option value="English">English</Option>
          <Option value="Vietnamese">Vietnamese</Option>
        </Select>
      </Form.Item>
      <Form.Item name="amount" label="Number">
        <Input type="number" defaultValue={10} />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            "Render"
          )}
        </Button>
      </Form.Item>
    </Form>
  );
};
export default QuizInputForm;
