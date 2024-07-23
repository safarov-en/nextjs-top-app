import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import styles from '../layout.module.css'
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { getMenuItem } from "@/api/menu";
import { Up } from "@/components/Up/Up";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menu = await getMenuItem(0)
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.wrapper}>
          <Header className={styles.header} menu={menu}/>
          <Sidebar className={styles.sidebar} menu={menu}/>
          <div className={styles.body}>
            {children}
          </div>
          <Footer className={styles.footer}/>
          <Up />
        </div>
      </body>
    </html>
  );
}
