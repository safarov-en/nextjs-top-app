import { Sidebar } from "@/components/Sidebar/Sidebar"
import { firstLevelMenu } from "@/helpers/helpers"
import styles from '../../layout.module.css'
import { getMenu } from "@/api/menu"

export default async function Type({params, ...props}: {params: {type: string}}) {
    const menu = await getMenu(0, params.type)
    const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type)
    return (
        <>
            <Sidebar className={styles.sidebar} menu={menu}/>
            <div className={styles.body}>
                Page {firstCategoryItem?.id}
            </div>
        </>
    )
}

export const generateStaticParams = async () => {
    return firstLevelMenu.map(m => '/' + m.route)
}