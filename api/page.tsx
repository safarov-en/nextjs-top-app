import { API } from "../app/api";
import { TopPageModal } from "@/interfaces/page.interface";

export async function getPage(alias: string): Promise<TopPageModal> {
    const res = await fetch(API.topPage.byAlias + alias)
    return res.json()
}