"use client";

import { memo, useCallback, useEffect, useState } from "react";

import { Plu } from "@/entity/plu";
import { getQuestionBank } from "@/data/query";

import QuizFrame from "./quizFrame";
import {PrimaryButton, PrimaryOutlineButton} from "@/components/button";

const QuizPage = function Page() {
  const [questions, setQuestions] = useState<Plu[]>([]);
  const [answered, setAnswered] = useState<Plu[]>([]);
  const [totalQuestionNo, setTotalQuestionNo] = useState<number>(0);
  const [correctQuestionNo, setCorrectQuestionNo] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);
  const [currentQuestion, setCurrentQuestion] = useState<Plu | null>(null);

  const restartQuiz = useCallback(() => {
    const res = getQuestionBank();
    setQuestions(res);
    setAnswered([]);
    setTotalQuestionNo(res.length);
    setCorrectQuestionNo(0);
    setCurrentQuestion(null);
  }, []);

  useEffect(() => {
    restartQuiz();
  }, [restartQuiz]);

  const nextQuestion = useCallback(() => {
    if (questions.length != 0) {
      const index = questions.length!==1? Math.trunc(Math.random() * (questions.length - 1)) : 0;
      setCurrentQuestionIndex(index);
      setCurrentQuestion(questions[index]);
    }
  }, [questions]);

  useEffect(() => {
    if (currentQuestion == null && questions?.length != 0) {
      nextQuestion();
    }
  }, [currentQuestion, nextQuestion, questions?.length]);

  const onNextQuestion = useCallback(() => {
    if (currentQuestion !== null && currentQuestion.quizResult === null) {
      //skip question
      const answer = currentQuestion;
      setQuestions(questions.toSpliced(currentQuestionIndex, 1));
      setAnswered((item) => [...item, answer]);
    }
    if (currentQuestion != null) {
      setCurrentQuestion(null);
    }
  }, [currentQuestion, currentQuestionIndex, questions]);

  const checkAnswer = useCallback(
    (input: string) => {
      if (
        currentQuestion == null ||
        input == null //||
        //input.trim().length == 0
      ) {
        return;
      }

      const answer = currentQuestion;
      if (String(input).trim() === currentQuestion.plu) {
        setCorrectQuestionNo((item) => item + 1);
        answer.quizResult = true;
      } else {
        answer.quizResult = false;
      }
      setQuestions((item) => item.toSpliced(currentQuestionIndex, 1));
      setAnswered((item) => [...item, answer]);
      setCurrentQuestion(answer);
      setCurrentQuestionIndex(-1);
    },
    [currentQuestion, currentQuestionIndex]
  );

  return (
    <main>
      <div className="flex flex-wrap">
        <PrimaryOutlineButton
          className="flex-1"
          onClick={restartQuiz}
        >
          Restart
        </PrimaryOutlineButton>
        <p className="flex-1 text-center self-center">{`${answered.length}/${totalQuestionNo} (${correctQuestionNo})`}</p>
        <PrimaryButton
          className="flex-1"
          onClick={onNextQuestion}
          disabled={questions?.length < 2}
        >
          Next Question
        </PrimaryButton>
      </div>
      
      {currentQuestion !== null && (
        <QuizFrame
          currentQuestion={currentQuestion}
          checkAnswer={checkAnswer}
        />
      )}
    </main>
  );
};

export default memo(QuizPage);
