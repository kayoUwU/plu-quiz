//read: https://react.dev/reference/react/cloneElement#passing-data-with-a-render-prop

import { memo } from "react";

const gridStyle =
  "group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30";

type DescriptionButtonProps = {
  title: string;
  description?: string | undefined;
  renderElement: (className: string, children: JSX.Element) => JSX.Element;
};

function DescriptionButton({
  title,
  description,
  renderElement,
}: DescriptionButtonProps): JSX.Element {
  return renderElement(
    gridStyle,
    <>
      <h2 className={`mb-3 text-2xl font-semibold`}>
        {title}{" "}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      {description && (
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{description}</p>
      )}
    </>
  );
}
export default memo(DescriptionButton);
