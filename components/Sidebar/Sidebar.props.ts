import { MenuItem } from "@/interfaces/menu.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    menu: MenuItem[]
}