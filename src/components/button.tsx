import { memo } from "react";

const baseStyle = 'py-2 px-4 rounded shadow focus:shadow-outline focus:outline-none';
const variantsStyles = {
    primary : 'font-bold text-white bg-indigo-500 hover:bg-indigo-700',
    primary_outline : 'bg-transparent hover:bg-indigo-700 text-indigo-500 font-semibold hover:text-white hover:font-bold border border-indigo-500 hover:border-transparent',
    second:'font-bold text-white bg-orange-500 hover:bg-orange-700'
};

type VariantsKey =  keyof typeof variantsStyles;

export const BUTTON_STYLE_NAME = {
    primary : 'primary' as VariantsKey,
    primary_outline: 'primary_outline' as VariantsKey,
    second: 'second' as VariantsKey
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: VariantsKey | undefined,
    children: React.ReactNode
}

function Button(props: ButtonProps) : JSX.Element {
    return (
        <button
            {...props}
            className={`${baseStyle} ${props.variant?variantsStyles[props.variant]:''} ${props.className}`}
        >
            {props.children}
        </button>
  
    );
}

Button.defaultProps = {
    variant: undefined
};

export default memo(Button);

const _primaryButton = (props: ButtonProps) => {
    return Button({...props, variant: BUTTON_STYLE_NAME.primary});
};
export const PrimaryButton = memo(_primaryButton);

const _primaryOutlineButton = (props: ButtonProps) => {
    return Button({...props, variant: BUTTON_STYLE_NAME.primary_outline});
}
export const PrimaryOutlineButton = memo(_primaryOutlineButton);

export const SecondaryButton = (props: ButtonProps) => {
    return Button({...props, variant: BUTTON_STYLE_NAME.second});
}