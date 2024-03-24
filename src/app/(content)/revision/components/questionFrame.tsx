import Image from "next/image";

import { IMAGE_PATH_PREFIX } from "@/lib/constant";
import { Plu } from "@/entity/plu";
import { memo } from "react";

export type QuestionFrameProps = {
  question: Plu;
};

const QuestionFrame = function ({ question }: Readonly<QuestionFrameProps>) {
  console.log("question.image",question.image);
  return (
    <>
      <div className="flex min-w-0 gap-x-4">
        {question.image ? (
          <Image
            className="flex-none rounded-full bg-gray-50"
            src={`${IMAGE_PATH_PREFIX}${question.image}`}
            alt={question.name}
            width={45}
            height={45}
          />
        ) : (
          <div
            style={{
              height: "45px",
              width: "45px",
            }}
          ></div>
        )}

        <div className="min-w-0 flex-auto">
          <p>{question.name}</p>
        </div>
      </div>

      <div className="shrink-0 flex flex-col items-start sm:items-end">
        <p>{question.plu}</p>
      </div>
    </>
  );
};

export default memo(QuestionFrame);
