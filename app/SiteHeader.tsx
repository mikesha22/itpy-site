"use client";

import Link from "next/link";
import { useRef } from "react";

type SiteHeaderProps = { active: "home" | "courses" };

export default function SiteHeader({ active }: SiteHeaderProps) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => { if (menuRef.current) menuRef.current.open = false; };

  return (
    <header className="site-header site-header-new">
      <Link className="header-logo" href="/" aria-label="ITPY — на главную">
        <img src="/itpy-logo-2026.png" alt="ITPY" width={1024} height={1024} />
      </Link>
      <nav className="site-switcher" aria-label="Основные разделы">
        <Link href="/" aria-current={active === "home" ? "page" : undefined}>Заниматься со мной</Link>
        <Link href="/courses" aria-current={active === "courses" ? "page" : undefined}>Мои курсы</Link>
      </nav>
      <div className="site-header-actions">
        <Link className="header-trial" href="/#trial">Пробное занятие <span aria-hidden="true">↗</span></Link>
        <details className="header-links" ref={menuRef}>
          <summary>
            <span className="header-menu-icon" aria-hidden="true"><span /><span /><span /></span>
            Содержание
            <span className="header-menu-chevron" aria-hidden="true">⌄</span>
          </summary>
          <div className="header-links-menu">
            <div className="header-links-list">
              <Link href="/#learning" onClick={closeMenu}><span className="header-link-number">01</span><span>Как проходят занятия</span><span aria-hidden="true">↗</span></Link>
              <Link href="/#results" onClick={closeMenu}><span className="header-link-number">02</span><span>Отзывы учеников</span><span aria-hidden="true">↗</span></Link>
              <Link href="/#about" onClick={closeMenu}><span className="header-link-number">03</span><span>Обо мне</span><span aria-hidden="true">↗</span></Link>
              <Link href="/courses" onClick={closeMenu}><span className="header-link-number">04</span><span>Курсы и материалы</span><span aria-hidden="true">↗</span></Link>
              <Link href={active === "courses" ? "/courses#contacts" : "/#contacts"} onClick={closeMenu}><span className="header-link-number">05</span><span>Соцсети и контакты</span><span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
