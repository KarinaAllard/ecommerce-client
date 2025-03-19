import "/src/styles/button.css"

interface IButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export const Button = (props: IButtonProps) => {
    return (
        <button type={props.type} className={props.className} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>
    )
}