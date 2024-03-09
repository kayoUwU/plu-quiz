"use client";

import { Plu } from "@/entity/plu";
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

export enum QUESTION_DISPATCH_ACTION {
  SETUP = "setup",
}
type QuestionContextType = Plu[];
type QuestionDispatchAction = {
  type: QUESTION_DISPATCH_ACTION;
  payload?: Plu[] | undefined;
};

function questionReducer(
  question: QuestionContextType,
  action: QuestionDispatchAction
): QuestionContextType {
  switch (action.type) {
    case QUESTION_DISPATCH_ACTION.SETUP: {
      if (action.payload) {
        return action.payload;
      }
      return question;
    }
    default: {
      return question;
    }
  }
}

const QuestionBankContext = createContext<
  [QuestionContextType, Dispatch<QuestionDispatchAction>]
>([[], (questionDispatchAction: QuestionDispatchAction) => {}]);

export function useQuestionBank() {
  return useContext(QuestionBankContext);
}

export function QuestionBankProvider({ children, initialData }: { children: ReactNode, initialData?: QuestionContextType }) {
  const [questionBank, dispatch] = useReducer(questionReducer, initialData||[]);

  return (
    <QuestionBankContext.Provider value={[questionBank, dispatch]}>
      {children}
    </QuestionBankContext.Provider>
  );
}
