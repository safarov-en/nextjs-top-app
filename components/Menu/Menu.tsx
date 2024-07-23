'use client'

import { FirstLevelMenuItem, MenuItem, PageItem } from "@/interfaces/menu.interface";
import styles from './Menu.module.css'
import cn from 'classnames'
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useState } from "react";
import { firstLevelMenu } from "@/helpers/helpers";
import { motion } from "framer-motion";

export default function Menu({menu}: {menu: MenuItem[]}) {
    const [item, setMenuItem] = useState(menu)
    const pathname = usePathname()
    const variants = {
        visible: {
            marginBottom: 20,
            transition: {
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
        hidden: {opacity: 0, height: 0}
    }
    const openSecondLevel = (secondCategory: string) => {
        setMenuItem(item.map(m => {
            if(m._id.secondCategory == secondCategory) {
                m.isOpened = !m.isOpened
            }
            return m
        }))
    }
    const buildFirstLevel = () => {
        return (
            <>
                {firstLevelMenu.map(m => (
                    <div key={m.route}>
                        <Link href={`/${m.route}`}>
                            <div className={cn(styles.firstLevel, {
                                [styles.firstLevelActive]: m.id == 0
                            })}>
                                {m.icon}
                                <span>{m.name}</span>
                            </div>
                        </Link>
                        {m.id == 0 && buildSecondLevel(m)}
                    </div>
                ))}
            </>
        )
    }
    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {item.map(m => {
                    if(m.pages.map(p => p.alias).includes(pathname.split('/')[2])) {
                        m.isOpened = true
                    }
                    return (
                        <div key={m._id.secondCategory}>
                            <div className={styles.secondLevel} onClick={() => openSecondLevel(m._id.secondCategory)}>{m._id.secondCategory}</div>
                            <motion.div
                                layout
                                variants={variants}
                                initial={m.isOpened ? 'visible' : 'hidden'}
                                animate={m.isOpened ? 'visible' : 'hidden'}
                                className={cn(styles.secondLevelBlock)}
                            >
                                {buildThirdLevel(m.pages, menuItem.route)}
                            </motion.div>
                        </div>
                    )
                })}
            </div>
        )
    }
    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return (
            pages.map(p => (
                <motion.div key={p._id} variants={varionsChildren}>
                    <Link href={`/${route}/${p.alias}`} className={cn(styles.thirdLevel, {
                        [styles.thirdLevelActive]: `${route}/${p.alias}` == pathname
                    })}>
                        {p.category}
                    </Link>
                </motion.div>
            ))
        )
    }
    return (
        <div className={styles.menu}>
            <>{buildFirstLevel()}</>
        </div>
    );
}