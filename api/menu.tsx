import { MenuItem } from "@/interfaces/menu.interface";
import { API } from "../app/api";
import { firstLevelMenu } from "@/helpers/helpers";
import { notFound } from "next/navigation";

export async function getMenu(firstCategory: number, type: string | undefined): Promise<MenuItem[]> {
    try {
        const firstCategoryItem = type && firstLevelMenu.find(m => m.route == type)
        if(!firstCategoryItem) {
            return notFound()
        }
        const res = await fetch(API.topPage.find, {
            method: 'POST',
            body: JSON.stringify({
                firstCategory: firstCategoryItem.id
            }),
            headers: new Headers({ 'content-type': 'application/json' })
        })
        return res.json()
    } catch {
        return notFound()
    }
}

export async function getMenuItem(firstCategory: number): Promise<MenuItem[]> {
    try {
        const res = await fetch(API.topPage.find, {
            method: 'POST',
            body: JSON.stringify({
                firstCategory
            }),
            headers: new Headers({ 'content-type': 'application/json' })
        })
        return res.json()
    } catch {
        return notFound()
    }
}