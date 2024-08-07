'use client'

import { Htag } from "@/components/Htag/Htag"
import { TopPageComponentProps } from "./TopPageComponent.props"
import { Tag } from "@/components/Tag/Tag"
import styles from './TopPageComponent.module.css'
import { HhData } from "@/components/HhData/HhData"
import { TopLevelCategory } from "@/interfaces/page.interface"
import { Advantages } from "@/components/Advantages/Advantages"
import { Sort } from "@/components/Sort/Sort"
import { SortEnum } from "@/components/Sort/Sort.props"
import { useEffect, useReducer } from "react"
import { sortReducer } from "./sort.reducer"
import { Product } from "@/components/Product/Product"
import { useScrollY } from "@/hooks/useScrollY"
import { useReducedMotion } from "framer-motion"

export const TopPageComponent = ({products, page, firstCategory}: TopPageComponentProps) => {
    const [{products: sortedProducts, sort}, dispathSort] = useReducer(sortReducer, {products, sort: SortEnum.Rating})
    const shouldReduceMotion = useReducedMotion()
    const y = useScrollY()
    const setSort = (sort: SortEnum) => {
        dispathSort({type: sort})
    }
    useEffect(() => {
        dispathSort({type: 'reset', initialState: products})
    }, [products])
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag='h1'>{page.title}</Htag>
                {products && <Tag color='grey' size='m' aria-label={products.length + 'элементов'}>{products.length}</Tag>}
                <Sort sort={sort} setSort={setSort} />
            </div>
            <div role='list'>
                {sortedProducts && sortedProducts.map(p => (<Product role='listitem' layout={shouldReduceMotion ? false : true} product={p} key={p._id} />))}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag='h2'>Вакансия - {page.category}</Htag>
                <Tag color='red' size='m'>hh.ru</Tag>
            </div>
            {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
            {page.advantages && page.advantages.length > 0 && <>
                <Htag tag='h2'>Преимущества</Htag>
                <Advantages advantages={page.advantages} />
            </>}
            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html: page.seoText}} />}
            <Htag tag='h2'>Получаемые навыки</Htag>
            {page.tags.map(t => <Tag key={t} color='primary'>{t}</Tag>)}
        </div>
    )
}