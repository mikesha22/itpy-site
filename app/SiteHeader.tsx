"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type SiteHeaderProps = { active: "home" | "courses" };

const sectionLinks = {
  home: [
    { href: "#courses", label: "ЕГЭ, ОГЭ и Python" },
    { href: "#learning", label: "Как проходят занятия" },
    { href: "#results", label: "Отзывы учеников" },
    { href: "#about", label: "Обо мне" },
    { href: "#faq", label: "Частые вопросы" },
    { href: "#contacts", label: "Соцсети и контакты" },
  ],
  courses: [
    { href: "#python", label: "Курс по Python" },
    { href: "#ege", label: "Курс по ЕГЭ" },
    { href: "#collections", label: "Сборники вариантов" },
    { href: "#help", label: "Помощь с выбором" },
    { href: "#contacts", label: "Соцсети и контакты" },
  ],
};

export default function SiteHeader({ active }: SiteHeaderProps) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const avatarDialogRef = useRef<HTMLDialogElement>(null);
  const avatarDialogId = useId();
  const [avatarOpen, setAvatarOpen] = useState(false);
  const closeMenu = () => { if (menuRef.current) menuRef.current.open = false; };

  useEffect(() => {
    if (!avatarOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [avatarOpen]);

  useEffect(() => {
    function dismissMenu(event: PointerEvent) {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) closeMenu();
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape" && menuRef.current?.open) {
        closeMenu();
        menuRef.current.querySelector("summary")?.focus();
      }
    }
    document.addEventListener("pointerdown", dismissMenu);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", dismissMenu);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <>
    <header className="site-header site-header-new site-header-personal">
      <div className="header-profile">
        <button
          className="header-avatar"
          type="button"
          aria-label="Открыть фото Ильи Андрианова"
          aria-haspopup="dialog"
          aria-controls={avatarDialogId}
          onClick={() => {
            closeMenu();
            avatarDialogRef.current?.showModal();
            setAvatarOpen(true);
          }}
        >
          <img src="/media/teacher-avatar.png" alt="" width={1254} height={1254} />
        </button>
        <div className="header-profile-copy">
          <Link className="header-name" href="/">Илья Андрианов</Link>
          <span className="header-tagline">Репетитор на 90+ по информатике</span>
          <a className="header-reviews" href="/#results" aria-label="Посмотреть 18 отзывов учеников">
            <span className="header-review-stars" aria-hidden="true">★★★★★</span>
            <span>18 отзывов <span aria-hidden="true">↗</span></span>
          </a>
        </div>
      </div>
      <div className="site-header-actions">
        <Link className="header-secondary header-courses" href="/courses" aria-current={active === "courses" ? "page" : undefined}>Курсы</Link>
        <a className="header-secondary header-telegram" href="https://t.me/ilandroxxy" target="_blank" rel="noopener noreferrer">Telegram <span aria-hidden="true">↗</span></a>
        <a className="header-trial" href="/#trial">Записаться на пробное <span aria-hidden="true">↗</span></a>
        <details className="header-links" ref={menuRef}>
          <summary aria-label={active === "home" ? "Разделы главной страницы" : "Разделы страницы курсов"}>
            <span className="header-menu-icon" aria-hidden="true"><span /><span /><span /></span>
          </summary>
          <div className="header-links-menu">
            <nav className="header-links-list" aria-label={active === "home" ? "Разделы главной страницы" : "Разделы страницы курсов"}>
              {sectionLinks[active].map((section, index) => (
                <a href={section.href} key={section.href} onClick={closeMenu}>
                  <span className="header-link-number">{String(index + 1).padStart(2, "0")}</span>
                  <span>{section.label}</span>
                  <span aria-hidden="true">↓</span>
                </a>
              ))}
              {active === "home" && <a className="header-menu-trial" href="#trial" onClick={closeMenu}><span className="header-link-number">→</span><span>Записаться на пробное</span><span aria-hidden="true">↓</span></a>}
            </nav>
          </div>
        </details>
      </div>
    </header>
    <dialog
      className="avatar-viewer"
      id={avatarDialogId}
      ref={avatarDialogRef}
      aria-label="Фото Ильи Андрианова"
      onClose={() => setAvatarOpen(false)}
      onClick={(event) => {
        if (event.target === event.currentTarget) avatarDialogRef.current?.close();
      }}
    >
      <div className="avatar-viewer-panel">
        <div className="avatar-viewer-toolbar">
          <span>Илья Андрианов <small>ITPY</small></span>
          <button type="button" aria-label="Закрыть фото" onClick={() => avatarDialogRef.current?.close()}>×</button>
        </div>
        <img src="/media/teacher-avatar.png" alt="Илья Андрианов за рабочим столом" width={1254} height={1254} />
      </div>
    </dialog>
    </>
  );
}
