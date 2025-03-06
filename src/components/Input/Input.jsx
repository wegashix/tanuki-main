import styles from './Input.module.css'
import cn from 'classnames'
import { forwardRef } from 'react'

const Input = forwardRef(({ isValid, className, ...props }, ref) => {
    return <input className={cn(styles['input'], className, {
        [styles.invalid]: isValid
    })} {...props} ref={ref} />
})

export default Input