import { Htag } from "@/components/Htag/Htag"
import { TopPageComponentProps } from "./TopPageComponent.props"
import { Tag } from "@/components/Tag/Tag"
import styles from './TopPageComponent.module.css'
import { HhData } from "@/components/HhData/HhData"
import { TopLevelCategory } from "@/interfaces/page.interface"

export const TopPageComponent = ({products, page, firstCategory}: TopPageComponentProps) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag='h1'>{page.title}</Htag>
                {products && <Tag color='grey' size='m'>{products.length}</Tag>}
                <span>Сортировка</span>
            </div>
            <div>
                {products && products.map(p => (<div key={p._id}>{p.title}</div>))}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag='h2'>Вакансия - {page.category}</Htag>
                <Tag color='red' size='m'>hh.ru</Tag>
            </div>
            {firstCategory == TopLevelCategory.Courses && <HhData {...page.hh} />}
        </div>
    )
}