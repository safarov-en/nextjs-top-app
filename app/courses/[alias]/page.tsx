import { getMenu } from "@/api/menu"
import { getPage } from "@/api/page"
import { getProducts } from "@/api/products"

export default async function Course({params}: {params: {alias: string}}) {
    const page = await getPage(params.alias)
    const products = await getProducts(page.category, 10)
    return (
        <>
            {products && products.length}
        </>
    )
}

export async function generateStaticParams() {
    const menu = await getMenu(0)
    return menu.flatMap(item => item.pages.map(page => '/courses/' + page.alias))
}