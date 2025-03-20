import React from "react";
import QuizInputForm from "../../components/QuizChat/QuizInputForm";
import { useQuizData } from "../../context/QuizContext";
import QuizChatReview from "../../components/QuizChat/QuizChatReview";
import AppLoading from "../../components/Loading/AppLoading";
import { useLoadingContext } from "../../context/LoadingContext";
import { Button, Image } from "antd";
const chat: React.FC = () => {
  const { isLoading, loading, stopLoading } = useLoadingContext();
  const { quizData } = useQuizData();

  return (
    <div
      className="flex md:justify-center md:items-start md:pt-0 pt-10 items-center min-h-screen md:h-full  bg-blue-100 overflow-hidden flex-col gap-4  md:flex-row scroll-auto"
      style={{
        backgroundImage: `url(${"/background.png"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className={`bg-blue-200 shadow-[8px_8px_10px_rgba(0,0,0,0.5)] mt-15  p-10 pt-30 md:pt-[10px] w-[90%] md:w-[30%] ${
          quizData && quizData[0] != null ? "h-150" : "h-full"
        }  md:h-[70%]`}
      >
        <div
          style={{
            position: "absolute",
            top: "100px",
            transform: "translateX(80%)",
            borderRadius: 20,
            padding: "0 15px",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Image src="../../../public/logo.png" width={100} height={100} className="hover:touch-none"/>
        </div>
        <div className="mt-0 md:mt-15">
          <QuizInputForm />
        </div>
        <AppLoading isShowLoading={isLoading} message="Gererating!!!" />
      </div>
      {quizData && quizData[0] != null ? (
        <div className="shadow-[8px_8px_10px_rgba(0,0,0,0.5)] p-3 mx-10 w-[90%] md:w-[60%] bg-blue-200 h-[600px] md:h-[70%] rounded-sm scroll-auto overflow-hidden mt-15">
          <QuizChatReview />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default chat;
