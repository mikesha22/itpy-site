const links = [
  ["Telegram-канал", "новости и материалы", "https://t.me/informatika_kege_itpy"],
  ["Написать мне", "личные сообщения", "https://t.me/ilandroxxy"],
] as const;

export default function LinkHub() {
  return (
    <div className="footer-link-hub">
      <div>
        <span className="footer-hub-kicker">Соцсети и контакты</span>
        <h2>На связи</h2>
        <p>Материалы — в канале, вопросы по занятиям — в личных сообщениях.</p>
      </div>
      <div className="footer-link-grid" aria-label="Соцсети и контакты ITPY">
        {links.map(([title, caption, href], index) => (
          <a className="footer-link-placeholder" key={title} href={href} target="_blank" rel="noopener noreferrer">
            <b>{String(index + 1).padStart(2, "0")}</b>
            <strong>{title}</strong>
            <small>{caption}</small>
            <i>↗</i>
          </a>
        ))}
      </div>
    </div>
  );
}
