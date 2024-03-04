"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";

import { Plu } from "@/entity/plu";
import { ResultStatus } from "@/entity/enum/resultStatus";

import QuizFrame from "./components/quizFrame";
import {
  PrimaryButton,
  PrimaryOutlineButton,
  WarnButton,
} from "@/components/button";
import {
  useAnswered,
  useAnsweredDispatch,
  ANSWERED_DISPATCH_ACTION,
} from "@/data/store/answeredContext";
import Modal from "@/components/modal";
import AnsweredList from "./components/answeredList";

const QuizPage = function Page() {
  const answered = useAnswered();
  const answeredDispatch = useAnsweredDispatch();
  const [isAnswerdModalOpen, setIsAnswerdModalOpen] = useState<boolean>(false);
  const [isReset, setIsReset] = useState<boolean>(true);
  const [questions, setQuestions] = useState<Plu[]>([]);
  const [totalQuestionNo, setTotalQuestionNo] = useState<number>(0);
  const [correctQuestionNo, setCorrectQuestionNo] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);
  const [currentQuestion, setCurrentQuestion] = useState<Plu | null>(null);
  const [currentQuestionNo, setCurrentQuestionNo] = useState<number>(0);

  const restartQuiz = useCallback(() => {
    answeredDispatch({
      type: ANSWERED_DISPATCH_ACTION.RESET,
    });
    setIsReset(true);
    setQuestions([]);
    setTotalQuestionNo(0);
    setCorrectQuestionNo(0);
    setCurrentQuestion(null);
    setCurrentQuestionNo(0);
  }, [answeredDispatch]);

  useEffect(() => {
    //load questions
    if (isReset) {
      let correctNo = 0;
      const res = answered.filter(
        (item) => {
          if(item.quizResult === ResultStatus.Status.IN_QUENE){
            return true;
          }
          if(item.quizResult === ResultStatus.Status.CORRECT){
            correctNo++;
          }
          return false;
        }
      );
      setQuestions(res);
      setTotalQuestionNo(answered.length);
      setCurrentQuestionNo(answered.length - res.length);
      setCorrectQuestionNo(correctNo);
      setIsReset(false);
    }
  }, [answered, isReset, questions.length]);

  // useEffect(() => {
  //   restartQuiz();
  // }, [restartQuiz]);

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
    if (
      currentQuestion !== null &&
      currentQuestion.quizResult === ResultStatus.Status.IN_QUENE
    ) {
      //skip question
      const answer = currentQuestion;
      answer.quizResult = ResultStatus.Status.SKIP;
      setQuestions(questions.toSpliced(currentQuestionIndex, 1));
      answeredDispatch({
        type: ANSWERED_DISPATCH_ACTION.RESULT,
        payload: answer,
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
        answer.quizResult = ResultStatus.Status.CORRECT;
      } else {
        answer.quizResult = ResultStatus.Status.WRONG;
      }
      setQuestions((item) => item.toSpliced(currentQuestionIndex, 1));
      answeredDispatch({
        type: ANSWERED_DISPATCH_ACTION.RESULT,
        payload: answer,
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
      <Modal
        title={`Result [${correctQuestionNo}/${totalQuestionNo}]`}
        onClose={onCloseAnsweredModal}
      >
        <AnsweredList answered={answered} />
      </Modal>
    ),
    [answered, correctQuestionNo, onCloseAnsweredModal, totalQuestionNo]
  );

  const questionNoDisplay =
    questions.length === 0 && currentQuestionNo === totalQuestionNo
      ? "View Result"
      : `${currentQuestionNo}/${totalQuestionNo} (${correctQuestionNo})`;

  return (
    <main>
      <div className="flex flex-wrap">
        <WarnButton className="flex-1" onClick={restartQuiz}>
          Restart
        </WarnButton>
        <PrimaryOutlineButton
          title="View Result"
          className="flex-1 text-center self-center"
          onClick={onOpenAnsweredModal}
        >
          {questionNoDisplay}
        </PrimaryOutlineButton>
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
