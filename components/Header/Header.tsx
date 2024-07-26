'use client'

import {HeaderProps} from './Header.props'
import styles from './Header.module.css'
import cn from 'classnames'
import Logo from '../Sidebar/logo.svg'
import { ButtonIcon } from '../ButtonIcon/ButtonIcon'
import { Sidebar } from '../Sidebar/Sidebar'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export const Header = ({className, menu, ...props}: HeaderProps): JSX.Element => {
    const [isOpened, setIsOpened] = useState<boolean>(false)
    const router = usePathname()
    const shouldReduceMotion = useReducedMotion()
    useEffect(() => {
        setIsOpened(false)
    }, [router])
    const variants = {
        opened: {
            opacity: 1,
            x: 0,
            transition: {
                stiffness: 20
            }
        },
        closed: {
            opacity: shouldReduceMotion ? 1 : 0,
            x: '100%'
        }
    }
    return (
        <header className={cn(className, styles.header)} {...props}>
            <Logo />
            <ButtonIcon appearance='white' icon='menu' onClick={() => setIsOpened(true)} />
            <motion.div
                className={styles.mobileMenu}
                variants={variants}
                initial={'closed'}
                animate={isOpened ? 'opened' : 'closed'}
            >
                <Sidebar menu={menu} />
                <ButtonIcon className={styles.menuClose} appearance='white' icon='close' onClick={() => setIsOpened(false)} />
            </motion.div>
        </header>
    )
}