"use client";

import { QuestionBankProvider } from "./questionBankContext";
import { AnsweredProvider } from "./answeredContext";
import { ReactNode, useEffect, useState, useTransition } from "react";
import { getQuestionBank } from "@/data/query";
import { Plu } from "@/entity/plu";

export function AppProvider({ children }: { children: ReactNode }) {
  const [_, startTransition] = useTransition();
  const [questionBank, setQuestionBank] = useState<Plu[]>([]);

  useEffect(() => {
    if (questionBank.length == 0) {
      getQuestionBank().then((data) => {
        // console.log("data", data);
        startTransition(() => {
          setQuestionBank(data);
        });
      });
    }
  }, [questionBank.length]);

  return (
    <>
      {questionBank.length ? (
        <QuestionBankProvider initialData={questionBank}>
          <AnsweredProvider initialData={questionBank}>
            {children}
          </AnsweredProvider>
        </QuestionBankProvider>
      ) : (
        children
      )}
    </>
  );
}
