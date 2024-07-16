import { SidebarProps } from "./Sidebar.props";
import styles from './Sidebar.module.css'
import cn from 'classnames'
import Menu from "../Menu/Menu";

export const Sidebar = ({menu, ...props}: SidebarProps): JSX.Element => {
    return (
        <div {...props}>
            <Menu menu={menu} />
        </div>
    )
}