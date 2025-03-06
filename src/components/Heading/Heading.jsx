import  styles from "./Heading.module.css"



export default function Heading({children}) {
    return (
        <h1 className={styles['title']}> {children} </h1>
    )
}