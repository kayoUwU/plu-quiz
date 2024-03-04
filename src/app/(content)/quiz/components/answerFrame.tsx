import { Plu } from "@/entity/plu";
import { memo } from "react";
import { ResultStatus } from "@/entity/enum/resultStatus";

export type AnswerFrameProps = {
    answer: Plu
};

function AnswerFrame({answer}:Readonly<AnswerFrameProps>) {
    const display = ResultStatus.display(answer.quizResult);
    return (
        <> 
            <p>{answer.name}: {answer.plu}</p>
            <p className={display.color}>{display.text}</p>
        </>
    )
} 

export default memo(AnswerFrame);