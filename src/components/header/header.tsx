"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

import Container from "@/components/container/container";
import ImageComponent from "@/components/imageComponent/imageComponent";
import useBreakpoints from "@/hooks/useBreakpoints";

import commonStyles from "@/common/common.styles";
import styles from "@/components/header/header.styles";

const menuItems = [
    {
        title: "Home",
        href: "/"
    },
    {
        title: "Platform Integrations",
        href: "/"
    },
    {
        title: "How it works",
        href: "/"
    },
    {
        title: "Pricing",
        href: "/pricing"
    }
];

const MENU_ITEM_STAGGER_DELAY_MS = 80;
const MENU_ITEM_START_DELAY_MS = 2500;

const Header = memo(() => {
    const [isActive, setIsActive] = useState(false);
    const breakpoints = useBreakpoints();
    const [scrolled, setScrolled] = useState(false);
    const [animateDesktopMenu, setAnimateDesktopMenu] = useState(false);
    const [animateMobileMenuItems, setAnimateMobileMenuItems] = useState(false);

    const menuItemBaseDelayMs = useMemo(() => MENU_ITEM_STAGGER_DELAY_MS, []);

    useEffect(() => {
        const container = document.getElementsByClassName("main-wrapper")[0];

        if (!container) return;

        const handleScroll = () => {
            if (container.scrollTop > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => setAnimateDesktopMenu(true), MENU_ITEM_START_DELAY_MS);
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (!isActive) return;

        const timeoutId = setTimeout(() => setAnimateMobileMenuItems(true), MENU_ITEM_START_DELAY_MS);
        return () => clearTimeout(timeoutId);
    }, [isActive]);

    const toggleMenu = useCallback(() => {
        setIsActive((prev) => {
            const next = !prev;
            if (!next) {
                setAnimateMobileMenuItems(false);
            }
            return next;
        });
    }, []);

    useEffect(() => {
        // Close mobile menu on desktop breakpoint
        if (!breakpoints.LG && isActive) {
            // Async state update to avoid React's synchronous effect warning
            queueMicrotask(() => {
                setIsActive(false);
                setAnimateMobileMenuItems(false);
            });
        }
    }, [breakpoints.LG, isActive]);

    return (
        <>
            <div className={styles.sticky(scrolled)}>
                <Container>
                    <div className={styles.header}>
                        <ImageComponent
                            url="/images/branding/logo.svg"
                            alternativeText="store_jump"
                            width={200}
                            height={48}
                            staticImage
                            className={styles.logo}
                        />
                        <div className={styles.menuWrapper}>
                            {
                                menuItems.map((item, index) =>
                                    <Link href={item.href} className={commonStyles.link(true)} key={index}>
                                        <span
                                            className={`${styles.menuItemAnimationBase} ${
                                                animateDesktopMenu ? styles.menuItemVisible : styles.menuItemPreVisible
                                            }`}
                                            style={{ transitionDelay: `${index * menuItemBaseDelayMs}ms` }}
                                        >
                                            {item.title}
                                        </span>
                                    </Link>
                                )
                            }
                        </div>
                        <button
                            onClick={toggleMenu}
                            className={`${styles.hamburger} ${isActive ? "is-active" : ""}`}
                            aria-label="Toggle menu"
                            aria-expanded={isActive}
                        >
                            <span className={styles.hamburgerLine1} />
                            <span className={styles.hamburgerLine2}>
                                <span className={styles.hamburgerline2Inner} />
                            </span>
                            <span className={styles.hamburgerLine3} />
                        </button>
                    </div>
                </Container>
            </div>
            <div className={styles.mobileMenu(isActive)}>
                <div className={styles.mobileMenuItemWrapper}>
                    {
                        menuItems.map((item, index) =>
                            <Link href={item.href} className={commonStyles.link(true)} key={index}>
                                <span
                                    className={`${styles.menuItemAnimationBase} ${
                                        isActive
                                            ? animateMobileMenuItems
                                                ? styles.menuItemVisible
                                                : styles.menuItemPreVisible
                                            : styles.menuItemHidden
                                    }`}
                                    style={{ transitionDelay: `${index * menuItemBaseDelayMs}ms` }}
                                >
                                    {item.title}
                                </span>
                            </Link>
                        )
                    }
                </div>
            </div>
        </>
    );
});

export default Header;