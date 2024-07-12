'use client'

import { FirstLevelMenuItem, PageItem } from "@/interfaces/menu.interface";
import CoursesIcon from '../icons/courses.svg'
import ServicesIcon from '../icons/services.svg'
import BooksIcon from '../icons/books.svg'
import ProductsIcon from '../icons/products.svg'
import { TopLevelCategory } from "@/interfaces/page.interface";
import styles from '../Menu.module.css'
import cn from 'classnames'
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useState } from "react";

const firstLevelMenu: FirstLevelMenuItem[] = [
    { route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses },
    { route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Services },
    { route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategory.Books },
    { route: 'products', name: 'Продукты', icon: <ProductsIcon />, id: TopLevelCategory.Products }
]

export default function MenuItem({menu}) {
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
        <>{buildFirstLevel()}</>
    )
}