import { memo } from "react";

const baseStyle = 'w-full py-2 px-3 appearance-none rounded border-0 text-gray-700 leading-normal ring-1 ring-inset ring-orange-500 focus:ring-4 focus:ring-inset focus:ring-orange-700';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input(props:InputProps) : JSX.Element {
    return (
        <input
        {...props}
        className={`${baseStyle} ${props.className}}`}
      />
    );
}
export default memo(Input);