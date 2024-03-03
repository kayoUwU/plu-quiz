import { Plu } from "@/entity/plu";
import { memo, useMemo } from "react";

export type AnswerFrameProps = {
    answer: Plu
};

function AnswerFrame({answer}:Readonly<AnswerFrameProps>) {
    const resultText:string = useMemo(()=>{
        if(answer.quizResult!=null){
            return answer.quizResult?'Correct':'Wrong';
        }
        return 'Skip';
    },[answer]);


    const resultColor:string = useMemo(()=>{
        if(answer.quizResult!=null){
            return answer.quizResult?'text-green-500':'text-red-500';
        }
        return 'text-yellow-500';
    },[answer]);

    return (
        <> 
            <p>{answer.name}: {answer.plu}</p>
            <p className={`${resultColor}`}>{resultText}</p>
        </>
    )
} 

export default memo(AnswerFrame);