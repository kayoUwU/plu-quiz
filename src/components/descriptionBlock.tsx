import { memo } from "react";

type DescriptionBlockProps = {
    term: string,
    children: React.ReactNode
}

function DescriptionBlock({term,children}:DescriptionBlockProps) {
  return (
    <>
      <dt className="mb-3 text-2xl font-bold underline underline-offset-8 decoration-solid decoration-4 decoration-orange-500">{term}</dt>
      <dd className="mb-10">
        {children}
      </dd>
    </>
  );
}

export default memo(DescriptionBlock);