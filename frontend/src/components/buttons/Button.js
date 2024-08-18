
import classes from './Button.module.css'


export default function Button({ children, type, onClick, isSelected, isSearchButton }) {

    let classNames = classes.button
    if (isSelected) {
        classNames = classes.button + ' ' + classes.active
    }

    return (
        <>
            {isSearchButton ? <button type={type} className={classes.button}>{children}</button> : <button type={type} onClick={onClick} className={classNames}>{children}</button>}
        </>

    )
}
