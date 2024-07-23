import { MenuItem } from "@/interfaces/menu.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface HeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    menu: MenuItem[]
}