import { Plu } from "@/entity/plu";
import AnswerFrame from "./answerFrame";
import { memo } from "react";
import { ResultStatus } from "@/entity/enum/resultStatus";

type AnsweredListProps = {
  answered: Plu[];
};

function AnsweredList({answered}:AnsweredListProps) {
  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 text-center sm:text-left"
    >
      {answered.map(
        (item) =>
          item.quizResult !== ResultStatus.Status.IN_QUENE && (
            <li
              key={item.id}
              className="sm:flex sm:justify-between gap-x-6 py-5"
            >
              <AnswerFrame answer={item} />
            </li>
          )
      )}
    </ul>
  );
}

export default memo(AnsweredList);
