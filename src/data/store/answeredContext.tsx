"use client";

/* combine context with a reducer  */
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

import { getQuestionBank } from "@/data/query";
import { Plu } from "@/entity/plu";
import { ResultStatus } from "@/entity/enum/resultStatus";

export enum ANSWERED_DISPATCH_ACTION {
  RESULT = "result",
  RESET = "reset",
}

type AnsweredContextType = Plu[];
type AnsweredDispatchAction = {
  type: ANSWERED_DISPATCH_ACTION;
  payload?: Plu | undefined;
};

function answeredReducer(
  answered: AnsweredContextType,
  action: AnsweredDispatchAction
): AnsweredContextType {
  switch (action.type) {
    case ANSWERED_DISPATCH_ACTION.RESULT: {
      if (action.payload) {
        const result = action.payload;
        return answered.map((item) => (item.id === result.id ? result : item));
      }
      return answered;
    }
    case ANSWERED_DISPATCH_ACTION.RESET: {
      return answered.map((item) => ({
        ...item,
        quizResult: ResultStatus.Status.IN_QUENE,
      }));
    }
    default: {
      console.error(Error("Unknown action: " + action.type));
      return answered;
    }
  }
}

const initalAnsweredContext = getQuestionBank();
const AnsweredContext = createContext<AnsweredContextType>([]);
const AnsweredDispatchContext = createContext<Dispatch<AnsweredDispatchAction>>(
  (answeredDispatchAction: AnsweredDispatchAction) => {}
);

export function useAnswered() {
  return useContext(AnsweredContext);
}

export function useAnsweredDispatch() {
  return useContext(AnsweredDispatchContext);
}

export function AnsweredProvider({ children }: { children: ReactNode }) {
  const [answered, dispatch] = useReducer(answeredReducer, initalAnsweredContext);

  return (
    <AnsweredContext.Provider value={answered}>
      <AnsweredDispatchContext.Provider value={dispatch}>
        {children}
      </AnsweredDispatchContext.Provider>
    </AnsweredContext.Provider>
  );
}
