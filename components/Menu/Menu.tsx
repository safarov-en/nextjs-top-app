'use client'

import { FirstLevelMenuItem, MenuItem, PageItem } from "@/interfaces/menu.interface";
import styles from './Menu.module.css'
import cn from 'classnames'
import Link from "next/link"
import { usePathname } from "next/navigation";
import { KeyboardEvent, useState } from "react";
import { firstLevelMenu } from "@/helpers/helpers";
import { motion, useReducedMotion } from "framer-motion";

export default function Menu({menu}: {menu: MenuItem[]}) {
    const [item, setMenuItem] = useState(menu)
    const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>()
    const shouldReduceMotion = useReducedMotion()
    const pathname = usePathname()
    const variants = {
        visible: {
            marginBottom: 20,
            transition: shouldReduceMotion ? {} : {
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        },
        hidden: { marginBottom: 0 }
    }
    const varionsChildren = {
        visible: {
            opacity: 1,
            height: 29
        },
        hidden: {opacity: shouldReduceMotion ? 1 : 0, height: 0}
    }
    const openSecondLevel = (secondCategory: string) => {
        setMenuItem(item.map(m => {
            if(m._id.secondCategory == secondCategory) {
                setAnnounce(m.isOpened ? 'closed' : 'opened')
                m.isOpened = !m.isOpened
            }
            return m
        }))
    }
    const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
        if(key.code == 'Space' || key.code == 'Enter') {
            key.preventDefault()
            openSecondLevel(secondCategory)
        }
    }
    const buildFirstLevel = () => {
        return (
            <ul className={styles.firstLevelList}>
                {firstLevelMenu.map(m => (
                    <li key={m.route} aria-expanded={m.id == 0}>
                        <Link href={`/${m.route}`}>
                            <div className={cn(styles.firstLevel, {
                                [styles.firstLevelActive]: m.id == 0
                            })}>
                                {m.icon}
                                <span>{m.name}</span>
                            </div>
                        </Link>
                        {m.id == 0 && buildSecondLevel(m)}
                    </li>
                ))}
            </ul>
        )
    }
    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <ul className={styles.secondBlock}>
                {item.map(m => {
                    if(m.pages.map(p => p.alias).includes(pathname.split('/')[2])) {
                        m.isOpened = true
                    }
                    return (
                        <li key={m._id.secondCategory}>
                            <button
                                onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)}
                                className={styles.secondLevel}
                                onClick={() => openSecondLevel(m._id.secondCategory)}
                                aria-expanded={m.isOpened}
                            >{m._id.secondCategory}</button>
                            <motion.ul
                                layout
                                variants={variants}
                                initial={m.isOpened ? 'visible' : 'hidden'}
                                animate={m.isOpened ? 'visible' : 'hidden'}
                                className={styles.secondLevelBlock}
                            >
                                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
                            </motion.ul>
                        </li>
                    )
                })}
            </ul>
        )
    }
    const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
        return (
            pages.map(p => (
                <motion.li key={p._id} variants={varionsChildren}>
                    <Link
                        tabIndex={isOpened ? 0 : -1}
                        href={`/${route}/${p.alias}`}
                        className={cn(styles.thirdLevel, {
                            [styles.thirdLevelActive]: `${route}/${p.alias}` == pathname
                        })}
                        aria-current={`/${route}/${p.alias}` == pathname ? 'page' : false}
                    >
                        {p.category}
                    </Link>
                </motion.li>
            ))
        )
    }
    return (
        <nav className={styles.menu} role='navigation'>
            {announce && <span role='log' className='visualyHidden'>{announce == 'opened' ? 'развернуто' : 'свернуто'}</span>}
            {buildFirstLevel()}
        </nav>
    );
}