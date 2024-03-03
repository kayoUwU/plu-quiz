
import { Plu } from "@/entity/plu";
import AnswerFrame from "./answerFrame";
import { memo } from "react";
import { useAnswered } from "@/data/store/answeredContext";

type AnsweredListProps = {
  answered:Plu[]
}

function AnsweredList() {
  const answered = useAnswered();

  return (
    <ul role="list" className="divide-y divide-gray-100 text-center sm:text-left">
      {answered.map((item) => (
        <li key={item.id} className="sm:flex sm:justify-between gap-x-6 py-5">
          <AnswerFrame answer={item} />
        </li>
      ))}
    </ul>
  );
}

export default memo(AnsweredList);
