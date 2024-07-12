import { getMenu } from "@/api/menu";
import styles from './Menu.module.css'
import MenuItem from "./MenuItem/MenuItem";

export default async function Menu() {
    const menu = await getMenu(0)
    return (
        <div className={styles.menu}>
            <MenuItem menu={menu} />
        </div>
    );
}