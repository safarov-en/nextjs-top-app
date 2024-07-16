'use client'

import { FirstLevelMenuItem, MenuItem, PageItem } from "@/interfaces/menu.interface";
import styles from './Menu.module.css'
import cn from 'classnames'
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useState } from "react";
import { firstLevelMenu } from "@/helpers/helpers";

export default function Menu({menu}: {menu: MenuItem[]}) {
    const [item, setMenuItem] = useState(menu)
    const pathname = usePathname()
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
                            <div className={cn(styles.secondLevelBlock, {
                                [styles.secondLevelBlockOpened]: m.isOpened
                            })}>
                                {buildThirdLevel(m.pages, menuItem.route)}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return (
            pages.map(p => (
                <Link key={p._id} href={`/${route}/${p.alias}`} className={cn(styles.thirdLevel, {
                    [styles.thirdLevelActive]: `${route}/${p.alias}` == pathname
                })}>
                    {p.category}
                </Link>
            ))
        )
    }
    return (
        <div className={styles.menu}>
            <>{buildFirstLevel()}</>
        </div>
    );
}