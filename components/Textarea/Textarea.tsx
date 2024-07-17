import { TextareaProps } from "./Textarea.props"
import styles from '../Input/Input.module.css'
import cn from 'classnames'

export const Textarea = ({className, ...props}: TextareaProps): JSX.Element => {
    return (
        <textarea className={cn(className, styles.input)} {...props} />
    )
}