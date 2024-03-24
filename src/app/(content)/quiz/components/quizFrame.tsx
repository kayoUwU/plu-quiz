import { memo, useState } from "react";
import Image from "next/image";

import { Plu } from "@/entity/plu";
import { ResultStatus } from "@/entity/enum/resultStatus";
import { IMAGE_PATH_PREFIX } from "@/lib/constant";
import { SecondaryButton } from "@/components/button";
import Input from "@/components/input";

export type QuizFrameProps = {
  currentQuestion: Plu;
  checkAnswer: (input: string) => void;
};

function QuizFrame(props: Readonly<QuizFrameProps>) {
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const resultDisplay = ResultStatus.display(props.currentQuestion.quizResult);

  return (
    <div className="flex flex-col w-full">
      {props.currentQuestion.image ? (
        <Image
          className="object-scale-down object-center self-center dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
          src={`${IMAGE_PATH_PREFIX}${props.currentQuestion.image}`}
          alt={props.currentQuestion.name}
          width={500}
          height={500}
          priority
        />
      ) : (
        <div
          style={{
            height: "500px",
            width: "500px",
          }}
        ></div>
      )}

      <p>{props.currentQuestion.name}</p>

      <div className="flex items-center w-full">
        <Input
          value={currentAnswer}
          type="number"
          onChange={(e) => setCurrentAnswer(e.target.value)}
          onKeyDown={(e) => {
            //e.preventDefault(); //need to default input on field
            if (e.key === "Enter") {
              props.checkAnswer(currentAnswer);
            }
          }}
        />
        <SecondaryButton onClick={() => props.checkAnswer(currentAnswer)}>
          Check
        </SecondaryButton>
      </div>

      <p className={resultDisplay.color}>{resultDisplay.text}</p>
      {props.currentQuestion.quizResult === ResultStatus.Status.WRONG && (
        <p>Correct answer is {props.currentQuestion.plu}</p>
      )}
    </div>
  );
}

export default memo(QuizFrame);
