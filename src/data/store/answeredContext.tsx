"use client";

/* combine context with a reducer  */
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

import { Plu } from "@/entity/plu";
import { ResultStatus } from "@/entity/enum/resultStatus";

export enum ANSWERED_DISPATCH_ACTION {
  RESULT = "result",
  RESET = "reset",
  SETUP = "setup",
}

type AnsweredContextType = Plu[];
type AnsweredDispatchAction = {
  type: ANSWERED_DISPATCH_ACTION;
  payload?: Plu[] | undefined;
};

function answeredReducer(
  answered: AnsweredContextType,
  action: AnsweredDispatchAction
): AnsweredContextType {
  switch (action.type) {
    case ANSWERED_DISPATCH_ACTION.RESULT: {
      if (action.payload) {
        const result = action.payload;
        return answered.map((item) => (result.find(r=>r.id===item.id) || item));
      }
      return answered;
    }
    case ANSWERED_DISPATCH_ACTION.RESET: {
      return answered.map((item) => ({
        ...item,
        quizResult: ResultStatus.Status.IN_QUENE,
      }));
    }
    case ANSWERED_DISPATCH_ACTION.SETUP: {
      if (action.payload) {
        const result = action.payload;
        return result;
      }
      return answered;
    }
    default: {
      console.error(Error("Unknown action: " + action.type));
      return answered;
    }
  }
}

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

export function AnsweredProvider({ children, initialData }: { children: ReactNode, initialData?:AnsweredContextType }) {
  const [answered, dispatch] = useReducer(answeredReducer, initialData||[]);

  return (
    <AnsweredContext.Provider value={answered}>
      <AnsweredDispatchContext.Provider value={dispatch}>
        {children}
      </AnsweredDispatchContext.Provider>
    </AnsweredContext.Provider>
  );
}
