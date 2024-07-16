import { getMenu, getMenuItem } from "@/api/menu"
import { getPage } from "@/api/page"
import { getProducts } from "@/api/products"
import { Sidebar } from "@/components/Sidebar/Sidebar";
import styles from '../../../layout.module.css'
import { firstLevelMenu } from "@/helpers/helpers";
import { notFound } from "next/navigation";

export default async function Course({params}: {params: {alias: string, type: string}}) {
    const page = await getPage(params.alias)
    const products = await getProducts(page.category, 10)
    const menu = await getMenu(0, params.type)
    if(menu.length === 0) {
        return notFound()
    }
    return (
        <>
            <Sidebar className={styles.sidebar} menu={menu}/>
            <div className={styles.body}>
                {products && products.length}
            </div>
        </>
    )
}

export async function generateStaticParams() {
    let paths: string[] = []
    for(const m of firstLevelMenu) {
        const menu = await getMenuItem(m.id)
        paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)))
    }
    return paths
}