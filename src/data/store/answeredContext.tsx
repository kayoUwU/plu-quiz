"use client";

/* combine context with a reducer  */
import {
  Dispatch,
  ReactNode,
  ReducerWithoutAction,
  createContext,
  useContext,
  useReducer,
} from "react";

import { Plu } from "@/entity/plu";

export enum ANSWERED_DISPATCH_ACTION {
  ADD = "add",
  RESET = "reset",
}

type AnsweredContextType = Plu[];
type AnsweredDispatchAction = {
  type: ANSWERED_DISPATCH_ACTION;
  payload?: AnsweredContextType | undefined;
};

function answeredReducer(
  answered: AnsweredContextType,
  action: AnsweredDispatchAction
): AnsweredContextType {
  switch (action.type) {
    case ANSWERED_DISPATCH_ACTION.ADD: {
      return action.payload ? [...answered, ...action.payload] : answered;
    }
    case ANSWERED_DISPATCH_ACTION.RESET: {
      return [];
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

export function AnsweredProvider({ children }: { children: ReactNode }) {
  const [answered, dispatch] = useReducer(answeredReducer, []);

  return (
    <AnsweredContext.Provider value={answered}>
      <AnsweredDispatchContext.Provider value={dispatch}>
        {children}
      </AnsweredDispatchContext.Provider>
    </AnsweredContext.Provider>
  );
}
