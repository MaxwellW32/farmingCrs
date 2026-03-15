import { Session } from 'next-auth'
import React from 'react'
import styles from "./styles.module.css"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Logo from '../logo/Logo'

type subMenuItem = {
    link: string,
    title: string,
}

type navMenuItem = {
    link: string,
    title: string,
    subMenu: subMenuItem[]
}

const navMenu: navMenuItem[] = [
    {
        title: "dashboard",
        link: "/dashboard",
        subMenu: []
    },
    {
        title: "marketplace",
        link: "/marketplace",
        subMenu: []
    },
    {
        title: "profile",
        link: "/profile",
        subMenu: []
    },
    {
        title: "support",
        link: "/support",
        subMenu: []
    },
]

export default function Navbar({ session }: { session: Session | null }) {
    return (
        <div className={styles.navCont}>
            <nav className={styles.desktopNav}>
                <Logo />

                {session === null && (
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" asChild>
                            <Link href="/login">Log in</Link>
                        </Button>

                        <Button asChild>
                            <Link href="/login">Get Started</Link>
                        </Button>
                    </div>
                )}

                <ul className={styles.menu}>
                    {navMenu.map((eachMenuItem, eachMenuItemIndex) => {
                        return (
                            <li key={eachMenuItemIndex}>
                                <Link href={eachMenuItem.link}>{eachMenuItem.title}</Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <nav className={styles.mobileNav}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
                    <Logo />

                    <label htmlFor='mobileMenuCheckbox'>
                        <svg className='svgIcon' style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
                    </label>
                </div>

                {/* use checkbox styling to hide the menu */}
                <input id='mobileMenuCheckbox' className={`visibilityCheckbox ${styles.visibilityCheckbox}`} type="checkbox" />
                <div className={styles.popupMenu}>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" asChild>
                            <Link href="/login">Log in</Link>
                        </Button>

                        <Button asChild>
                            <Link href="/signup">Get Started</Link>
                        </Button>
                    </div>

                    <ul className={styles.menu}>
                        {navMenu.map((eachMenuItem, eachMenuItemIndex) => {
                            return (
                                <li key={eachMenuItemIndex}>
                                    <Link href={eachMenuItem.link}>{eachMenuItem.title}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </nav>
        </div>
    )
}