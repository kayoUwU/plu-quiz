"use client";

import { memo, useMemo } from "react";

import QuestionFrame from "./components/questionFrame";
import { getQuestionBank } from "@/data/query";

import usePagination from "@/components/usePagination";
import { Plu } from "@/entity/plu";

const RevisionPage = function Page() {
  const answered = useMemo(() => getQuestionBank(), []);

  const renderList = (data: Plu[])=>(
    (
      <ul role="list" className="grow overflow-y-auto divide-y divide-gray-100">
        {data.map((item) => (
          <li key={item.id} className="sm:flex sm:justify-between gap-x-6 p-3">
            <QuestionFrame question={item} />
          </li>
        ))}
      </ul>
    )
  )

  const pagination = usePagination({data:answered,renderList:renderList});

  return (
    <div className="h-full flex flex-col justify-start">
    {pagination}
    </div>
  );
};

export default memo(RevisionPage);
