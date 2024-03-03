"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";

import { Plu } from "@/entity/plu";
import { getQuestionBank } from "@/data/query";

import QuizFrame from "./components/quizFrame";
import { PrimaryButton, PrimaryOutlineButton } from "@/components/button";
import {
  useAnsweredDispatch,
  ANSWERED_DISPATCH_ACTION,
} from "@/data/store/answeredContext";
import Modal from "@/components/modal";
import AnsweredList from "./components/answeredList";

const QuizPage = function Page() {
  const answeredDispatch = useAnsweredDispatch();
  const [isAnswerdModalOpen, setIsAnswerdModalOpen] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Plu[]>([]);
  const [totalQuestionNo, setTotalQuestionNo] = useState<number>(0);
  const [correctQuestionNo, setCorrectQuestionNo] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);
  const [currentQuestion, setCurrentQuestion] = useState<Plu | null>(null);
  const [currentQuestionNo, setCurrentQuestionNo] = useState<number>(0);

  const restartQuiz = useCallback(() => {
    const res = getQuestionBank();
    answeredDispatch({
      type: ANSWERED_DISPATCH_ACTION.RESET,
    });
    setQuestions(res);
    setTotalQuestionNo(res.length);
    setCorrectQuestionNo(0);
    setCurrentQuestion(null);
    setCurrentQuestionNo(0);
  }, [answeredDispatch]);

  useEffect(() => {
    restartQuiz();
  }, [restartQuiz]);

  const nextQuestion = useCallback(() => {
    if (questions.length != 0) {
      const index =
        questions.length !== 1
          ? Math.trunc(Math.random() * (questions.length - 1))
          : 0;
      setCurrentQuestionIndex(index);
      setCurrentQuestion(questions[index]);
      setCurrentQuestionNo((item) => item + 1);
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
      answeredDispatch({
        type: ANSWERED_DISPATCH_ACTION.ADD,
        payload: [answer],
      });
    }
    if (currentQuestion != null) {
      setCurrentQuestion(null);
    }
  }, [answeredDispatch, currentQuestion, currentQuestionIndex, questions]);

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
      answeredDispatch({
        type: ANSWERED_DISPATCH_ACTION.ADD,
        payload: [answer],
      });
      setCurrentQuestion(answer);
      setCurrentQuestionIndex(-1);
    },
    [answeredDispatch, currentQuestion, currentQuestionIndex]
  );

  const onOpenAnsweredModal = useCallback(() => {
    setIsAnswerdModalOpen(true);
  }, []);

  const onCloseAnsweredModal = useCallback(() => {
    setIsAnswerdModalOpen(false);
  }, []);

  const AnsweredModal = useMemo(
    () => (
      <Modal title='Result' onClose={onCloseAnsweredModal}>
        <AnsweredList />
      </Modal>
    ),
    [onCloseAnsweredModal]
  );

  return (
    <main>
      <div className="flex flex-wrap">
        <PrimaryOutlineButton className="flex-1" onClick={restartQuiz}>
          Restart
        </PrimaryOutlineButton>
        <div
          className="flex-1 text-center self-center"
          onClick={onOpenAnsweredModal}
        >{`${currentQuestionNo}/${totalQuestionNo} (${correctQuestionNo})`}</div>
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

      {isAnswerdModalOpen && AnsweredModal}
    </main>
  );
};

export default memo(QuizPage);
