import styles from './Button.module.css'
import cn from 'classnames'

export default function Button({children, className, appearence = 'small', ...props}) {
    return (
        <button className={cn(styles['button'], styles['accent'], className, {
            [styles.small]: appearence === 'small',
            [styles.big]: appearence === 'big',
        })} 

        {...props}> {children}  </button>
    )
}