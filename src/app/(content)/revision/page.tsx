import { memo, useMemo } from "react";

import QuestionFrame from "./components/questionFrame";
import { getQuestionBank } from "@/data/query";

const RevisionPage = function Page() {
  const answered = useMemo(() => getQuestionBank(), []);

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {answered.map((item) => (
        <li key={item.id} className="sm:flex sm:justify-between gap-x-6 p-4">
          <QuestionFrame question={item} />
        </li>
      ))}
    </ul>
  );
};

export default memo(RevisionPage);
