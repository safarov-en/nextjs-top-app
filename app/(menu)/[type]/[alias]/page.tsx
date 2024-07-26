import { getMenu, getMenuItem } from "@/api/menu"
import { getPage } from "@/api/page"
import { getProducts } from "@/api/products"
import { Sidebar } from "@/components/Sidebar/Sidebar";
import styles from '../../../layout.module.css'
import { firstLevelMenu } from "@/helpers/helpers";
import { notFound } from "next/navigation";
import { TopPageComponent } from "@/page-components/TopPageComponent/TopPageComponent";
import Head from "next/head";

export default async function TopPage({params}: {params: {alias: string, type: string}}) {
    const page = await getPage(params.alias)
    const products = await getProducts(page.category, 10)
    const menu = await getMenu(0, params.type)
    const firstCategory = firstLevelMenu.find(m => m.route == params.type)
    if(menu.length === 0) {
        return notFound()
    }
    return (
        <>
            <Sidebar className={styles.sidebar} menu={menu}/>
            <div className={styles.body}>
                <Head>
                    <title>{page.metaTitle}</title>
                    <meta name="description" content={page.metaDescription} />
                    <meta property="og:title" content={page.metaTitle} />
                    <meta property="og:description" content={page.metaDescription} />
                    <meta property='og:locale' content='article' />
                </Head>
                <TopPageComponent
                    products={products}
                    page={page}
                    firstCategory={firstCategory?.id}
                />
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