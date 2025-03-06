import { Outlet } from 'react-router-dom'
import styles from './AuthLayout.module.css'

export default function AuthLayout() {
    return <div className={styles['layout']}>
        <div className={styles['logo']}>
            <img src='/logo-tanukiii.png' alt='логотип' width='363' height='273' />
        </div>
        <div className={styles['content']}>
            <Outlet />
        </div>
    </div>
}