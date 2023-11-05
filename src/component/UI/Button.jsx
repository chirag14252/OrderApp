

const Button = ({children,textOnly,className,...props})=>{
    let ButtonClass = textOnly?'text-button': 'button';
    ButtonClass += ' '+className;
    return(
        <button {...props} className={ButtonClass}>{children}</button>
    )
}

export default Button;