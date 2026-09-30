"use client";

import { useEffect, useRef, useState } from "react";
import SiteHeader from "./SiteHeader";
import LinkHub from "./LinkHub";

type Program = "ЕГЭ" | "ОГЭ" | "Python";
type StudyFormat = "Мини-группа" | "Индивидуально";

const programs: Array<{
  id: Program;
  code: string;
  title: string;
  description: string;
  accent: string;
  topics: string[];
}> = [
  {
    id: "ЕГЭ",
    code: "27/27",
    title: "Подготовка к ЕГЭ",
    description:
      "Закрываем всю программу: от базовой логики до сложных задач на Python.",
    accent: "violet",
    topics: ["1 учебный год", "все типы задач", "пробники"],
  },
  {
    id: "ОГЭ",
    code: "15/15",
    title: "Подготовка к ОГЭ",
    description:
      "Собираем уверенную базу и учимся решать экзамен без паники и угадываний.",
    accent: "lime",
    topics: ["с нуля", "практика", "разбор ошибок"],
  },
  {
    id: "Python",
    code: "PY",
    title: "Python с нуля",
    description:
      "Не просто учим команды — создаём программы и начинаем думать как разработчик.",
    accent: "peach",
    topics: ["7–10 класс", "проекты", "портфолио"],
  },
];

const learningSteps = [
  {
    number: "01",
    title: "Пробное занятие",
    text: "Знакомимся, определяем стартовый уровень и намечаем маршрут подготовки.",
  },
  {
    number: "02",
    title: "Осваиваем базу",
    text: "Разбираем теорию и закрепляем её заданиями из банка ФИПИ.",
  },
  {
    number: "03",
    title: "Решаем сложнее",
    text: "Переходим к авторским задачам повышенной сложности и разбираем ошибки.",
  },
  {
    number: "04",
    title: "Готовимся к экзамену",
    text: "Пишем пробники, отслеживаем прогресс и выходим на экзамен увереннее.",
  },
];

const teacherPrinciples = [
  "Лично веду занятия",
  "Сам проверяю практику",
  "Отвечаю на вопросы напрямую",
  "Адаптирую темп под ученика",
];

const reviewImages = Array.from({ length: 18 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  const extension = index === 17 ? "jpg" : "png";
  return `/reviews/review-${number}.${extension}`;
});

const faqs = [
  {
    q: "Я не умею программировать. Мне вообще сюда можно?",
    a: "Можно. Начальный уровень не проблема: сначала разбираемся с базой, а потом постепенно переходим к экзаменационным задачам и коду.",
  },
  {
    q: "Я учусь в 10 классе. Начинать сейчас или подождать?",
    a: "Начать заранее — хорошая идея: будет больше времени спокойно разобраться в темах и набрать практику без гонки перед экзаменом.",
  },
  {
    q: "Реально подготовиться к информатике за учебный год?",
    a: "Во многих случаях — да, но всё зависит от стартового уровня и цели. Поэтому сначала я оцениваю точку А и только потом честно предлагаю маршрут.",
  },
  {
    q: "Я запоминаю шаблоны, но всё равно не понимаю код. Что делать?",
    a: "Не зубрить ещё больше. Я разбираю, что делает каждая часть программы и почему решение работает — тогда изменение условия уже не ломает всю задачу.",
  },
];

export default function HomeClient() {
  const [program, setProgram] = useState<Program>("ЕГЭ");
  const [studyFormat, setStudyFormat] =
    useState<StudyFormat>("Мини-группа");
  const reviewsRef = useRef<HTMLDivElement>(null);
  const bookingDialogRef = useRef<HTMLDialogElement>(null);
  const [activeReview, setActiveReview] = useState(0);
  const [selectedReview, setSelectedReview] = useState<number | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingFrameLoaded, setBookingFrameLoaded] = useState(false);
  const [bookingLoadSlow, setBookingLoadSlow] = useState(false);

  useEffect(() => {
    if (!bookingOpen || bookingFrameLoaded) return;
    const timer = window.setTimeout(() => setBookingLoadSlow(true), 8000);
    return () => window.clearTimeout(timer);
  }, [bookingOpen, bookingFrameLoaded]);

  function moveReviews(direction: number) {
    const track = reviewsRef.current;
    const card = track?.querySelector<HTMLElement>(".review-orbit-card");
    track?.scrollBy({ left: direction * ((card?.offsetWidth ?? 310) + 16), behavior: "smooth" });
  }

  function chooseProgram(nextProgram: Program) {
    setProgram(nextProgram);
  }

  return (
    <main>
      <section className="hero" id="top">
        <SiteHeader active="home" />

        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="live-dot" aria-hidden="true" />
              набор на 2026/27 учебный год открыт
            </div>

            <h1>
              Информатика,
              <br />
              которую ты <span className="highlight">понимаешь</span>
            </h1>

            <p className="hero-lead">
              ITPY — мой авторский проект по информатике. Я готовлю к ЕГЭ и
              ОГЭ, разбираю Python и объясняю сложное человеческим языком.
            </p>

            <div className="hero-actions">
              <a className="primary-cta" href="#trial">
                Обсудить подготовку
                <span className="button-arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <span className="action-note">
                <strong>Без формальностей</strong>
                познакомимся и поймём задачу
              </span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Илья Андрианов — преподаватель информатики">
            <div className="visual-orbit visual-orbit-one" aria-hidden="true" />
            <div className="visual-orbit visual-orbit-two" aria-hidden="true" />

            <div className="subject-chip subject-chip-python">
              <span>⌘</span> Python
            </div>
            <div className="subject-chip subject-chip-exam">ЕГЭ · 27</div>

            <figure className="hero-photo-card">
              <img
                src="/media/teacher-workspace.png"
                alt="Илья Андрианов за рабочим столом, где проходят занятия по информатике"
                width={2048}
                height={1536}
              />
            </figure>
          </div>
        </div>

        <div className="hero-bottom" aria-label="Ключевые особенности">
          <div>
            <span className="feature-number">01</span>
            <p>
              <strong>Живые занятия</strong>
              <br />в группе или один на один
            </p>
          </div>
          <div>
            <span className="feature-number">02</span>
            <p>
              <strong>Домашка с обратной связью</strong>
              <br />а не просто «правильно / неправильно»
            </p>
          </div>
          <div>
            <span className="feature-number">03</span>
            <p>
              <strong>Поддержка весь год</strong>
              <br />от первого урока до экзамена
            </p>
          </div>
          <div>
            <span className="feature-number">04</span>
            <p>
              <strong>Личный маршрут</strong>
              <br />темы и темп под конкретную цель
            </p>
          </div>
          <div>
            <span className="feature-number">05</span>
            <p>
              <strong>Записи и конспекты</strong>
              <br />можно вернуться к теме в любой момент
            </p>
          </div>
          <div>
            <span className="feature-number">06</span>
            <p>
              <strong>Регулярные пробники</strong>
              <br />видим прогресс и разбираем ошибки
            </p>
          </div>
        </div>
      </section>

      <section className="learning-section section" id="learning">
        <div className="section-heading section-heading-light">
          <p className="section-kicker">Как всё устроено</p>
          <h2>
            Учёба без режима
            <br />
            «ничего не понимаю»
          </h2>
          <p className="section-intro">
            Понятный маршрут вместо бесконечных файлов, случайных уроков и
            надежды, что однажды всё сложится само.
          </p>
        </div>

        <div className="learning-grid">
          {learningSteps.map((step) => (
            <article className="learning-card" key={step.number}>
              <div className="learning-card-top">
                <span>{step.number}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>

        <div className="learning-media">
          <figure className="media-card media-card-featured">
            <img
              src="/media/learning-system.png"
              alt="Система подготовки ITPY: занятия в Zoom, домашние задания на Stepik, Telegram-канал и бот"
              width={2048}
              height={1536}
            />
          </figure>
          <div className="tools-gallery">
            <figure className="media-card">
              <img
                src="/media/student-bot.png"
                alt="Меню Telegram-бота ITPY с домашними заданиями, расписанием и конспектами"
                width={2048}
                height={1536}
              />
            </figure>
            <figure className="media-card">
              <img
                src="/media/score-bot.png"
                alt="Бот ITPY мгновенно проверяет пробник ЕГЭ и считает баллы"
                width={2048}
                height={1536}
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="results-section section" id="results">
        <div className="results-heading">
          <div className="section-heading">
            <p className="section-kicker">Результаты</p>
            <h2>Отзывы учеников</h2>
          </div>
          <div className="results-caption">
            <span>точка А</span>
            <div className="caption-line" />
            <span>точка Б</span>
          </div>
        </div>

        <div className="results-track">
          <article className="result-card result-before">
            <span className="result-status">до старта</span>
            <h3>«Я вообще не понимаю 27 задачу»</h3>
            <div className="result-meter">
              <span style={{ width: "28%" }} />
            </div>
            <p>Есть пробелы, нет системы и непонятно, за что хвататься.</p>
          </article>
          <span className="results-arrow" aria-hidden="true">
            →
          </span>
          <article className="result-card result-after">
            <span className="result-status">после маршрута</span>
            <h3>«Знаю алгоритм и спокойно решаю»</h3>
            <div className="result-meter">
              <span style={{ width: "86%" }} />
            </div>
            <p>Тема разложена по шагам, ошибки понятны, есть уверенность.</p>
          </article>
        </div>

        <div className="review-carousel" aria-label="Отзывы учеников">
          <div className="review-carousel-toolbar">
            <div>
              <strong>
                {String(activeReview + 1).padStart(2, "0")} / {reviewImages.length}
              </strong>
              <span>Листайте отзывы стрелками или свайпом</span>
            </div>
            <div className="review-carousel-buttons">
              <button
                type="button"
                aria-label="Предыдущий отзыв"
                onClick={() => moveReviews(-1)}
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Следующий отзыв"
                onClick={() => moveReviews(1)}
              >
                →
              </button>
            </div>
          </div>

          <div
            className="review-orbit"
            ref={reviewsRef}
            onScroll={(event) => {
              const card = event.currentTarget.querySelector<HTMLElement>(".review-orbit-card");
              if (card) setActiveReview(Math.min(reviewImages.length - 1, Math.round(event.currentTarget.scrollLeft / (card.offsetWidth + 16))));
            }}
          >
            {reviewImages.map((src, index) => (
                <button
                  className="review-orbit-card"
                  type="button"
                  key={src}
                  aria-label={`Открыть отзыв ${index + 1}`}
                  onClick={() => setSelectedReview(index)}
                >
                  <span className="review-card-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <img
                    src={src}
                    alt={`Отзыв ученика ${index + 1}`}
                    width={index < 2 ? 1536 : index === 17 ? 1280 : 1448}
                    height={index < 2 ? 1024 : index === 17 ? 960 : 1086}
                    loading={index > 3 ? "lazy" : "eager"}
                  />
                  <span className="review-card-open">Открыть оригинал ↗</span>
                </button>
            ))}
          </div>

          {selectedReview !== null && (
            <div className="review-lightbox">
              <button className="review-lightbox-backdrop" type="button" aria-label="Закрыть отзыв" onClick={() => setSelectedReview(null)} />
              <div
                className="review-lightbox-dialog"
                role="dialog"
                aria-modal="true"
                aria-label={`Отзыв ${selectedReview + 1} из ${reviewImages.length}`}
              >
                <div className="review-lightbox-topbar">
                  <span>
                    {String(selectedReview + 1).padStart(2, "0")} / {reviewImages.length}
                  </span>
                  <button
                    type="button"
                    aria-label="Закрыть отзыв"
                    onClick={() => setSelectedReview(null)}
                  >
                    ×
                  </button>
                </div>
                <div className="review-lightbox-content">
                  <button
                    type="button"
                    aria-label="Предыдущий отзыв"
                    onClick={() =>
                      setSelectedReview((current) =>
                        current === null || current === 0
                          ? reviewImages.length - 1
                          : current - 1,
                      )
                    }
                  >
                    ←
                  </button>
                  <img
                    src={reviewImages[selectedReview]}
                    alt={`Отзыв ученика ${selectedReview + 1}`}
                    width={
                      selectedReview < 2
                        ? 1536
                        : selectedReview === 17
                          ? 1280
                          : 1448
                    }
                    height={
                      selectedReview < 2
                        ? 1024
                        : selectedReview === 17
                          ? 960
                          : 1086
                    }
                  />
                  <button
                    type="button"
                    aria-label="Следующий отзыв"
                    onClick={() =>
                      setSelectedReview((current) =>
                        current === null || current === reviewImages.length - 1
                          ? 0
                          : current + 1,
                      )
                    }
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <a className="results-cta" href="#trial">Обсудить свою цель ↗</a>
      </section>

      <section className="team-section section" id="about">
        <div className="team-heading">
          <div className="section-heading">
            <p className="section-kicker">Обо мне</p>
            <h2>
              Занятия
              <br />веду сам
            </h2>
          </div>
          <p>
            ITPY — мой проект. От первой встречи до экзамена вы общаетесь
            напрямую со мной: я веду занятия, проверяю работу и вижу прогресс.
          </p>
        </div>

        <div className="solo-teacher-card">
          <div className="solo-photo">
            <img
              src="/media/teacher-workspace.png"
              alt="Илья Андрианов за рабочим столом"
              width={2048}
              height={1536}
            />
          </div>
          <div className="solo-teacher-copy">
            <span className="solo-role">Илья Андрианов · ITPY</span>
            <h3>ЕГЭ, ОГЭ и Python — лично со мной</h3>
            <p>
              У меня профильное высшее образование в IT. Я сам объясняю темы,
              проверяю решения, вижу прогресс и отвечаю на вопросы — подготовка
              не рассыпается между разными людьми.
            </p>
            <div className="solo-principles">
              {teacherPrinciples.map((item, index) => (
                <span key={item}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="expertise-gallery" aria-label="Опыт и проекты Ильи">
          <article className="expertise-card expertise-proof"><span>01 / образование</span><h3>Профильное IT-образование</h3><p>Объясняю информатику с опорой на фундаментальную базу и практику.</p></article>
          <article className="expertise-card expertise-proof"><span>02 / проект</span><h3>ITPY — мой проект</h3><p>Веду занятия лично и остаюсь на связи с учениками на протяжении подготовки.</p></article>
          <article className="expertise-card expertise-proof"><span>03 / материалы</span><h3>Курсы на Stepik</h3><p>Собрал отдельные материалы по Python, заданиям ЕГЭ и официальным вариантам.</p><a href="/courses">Посмотреть курсы ↗</a></article>
        </div>
      </section>

      <section className="courses-section section" id="courses">
        <div className="section-heading">
          <p className="section-kicker">Направления</p>
          <h2>
            Выбери цель.
            <br />
            Маршрут соберём вместе
          </h2>
        </div>

        <div className="courses-grid">
          {programs.map((course) => (
            <article
              className={"course-card course-" + course.accent}
              key={course.id}
            >
              <div className="course-card-head">
                <span className="course-code">{course.code}</span>
                <span className="course-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
              <div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
              <div className="course-tags">
                {course.topics.map((topic) => (
                  <span key={topic}>{topic}</span>
                ))}
              </div>
              <a
                href="#trial"
                className="course-button"
                onClick={() => chooseProgram(course.id)}
              >
                Это моя цель <span>→</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="benefits-section section">
        <div className="section-heading section-heading-light">
          <p className="section-kicker">Почему ITPY</p>
          <h2>
            Я убрал всё,
            <br />
            что мешает учиться
          </h2>
        </div>

        <div className="benefits-grid">
          <article className="benefit-card benefit-card-big">
            <span className="benefit-icon">{"{ }"}</span>
            <div>
              <h3>Сложное становится понятным</h3>
              <p>
                Разбираю тему на маленькие шаги и сразу показываю, где она
                встречается в реальных задачах.
              </p>
            </div>
          </article>
          <article className="benefit-card">
            <span className="benefit-icon">↻</span>
            <div>
              <h3>Можно пересмотреть</h3>
              <p>Записи и материалы остаются у ученика.</p>
            </div>
          </article>
          <article className="benefit-card">
            <span className="benefit-icon">?</span>
            <div>
              <h3>Не страшно спросить</h3>
              <p>Вопросы — часть процесса, а не повод чувствовать себя хуже.</p>
            </div>
          </article>
          <article className="benefit-card benefit-card-wide">
            <span className="benefit-icon">⌁</span>
            <div>
              <h3>Темп, который можно выдержать</h3>
              <p>
                Никаких рывков на две недели. Помогаю выстроить системную
                подготовку, которая вписывается в жизнь.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="support-section section">
        <div className="section-heading section-heading-light">
          <p className="section-kicker">Поддержка</p>
          <h2>
            Один на один
            <br />с задачей — но не один
          </h2>
        </div>

        <div className="support-layout">
          <div className="support-copy">
            <p>
              Если что-то не получается между уроками, не нужно ждать неделю.
              Можно написать напрямую мне — помогу разобраться и вернуться к
              плану.
            </p>
            <ul>
              <li>
                <span>✓</span> мои ответы на вопросы по практике
              </li>
              <li>
                <span>✓</span> помощь с темпом и графиком
              </li>
              <li>
                <span>✓</span> спокойная обратная связь без давления
              </li>
            </ul>
          </div>
          <div className="support-chat">
            <div className="chat-message chat-message-student">
              Не понимаю, почему здесь цикл не заканчивается 😵
              <span>18:42</span>
            </div>
            <div className="chat-message chat-message-teacher">
              Смотри: значение i не меняется внутри цикла. Давай добавим одну
              строку и проверим вместе?
              <span>18:44 · преподаватель ITPY</span>
            </div>
            <div className="chat-code">i += 1 <span>← вот она</span></div>
            <div className="chat-message chat-message-student chat-message-small">
              О, заработало! Спасибо 🙌
              <span>18:46</span>
            </div>
          </div>
        </div>

      </section>

      <section className="pricing-section section" id="pricing">
        <div className="pricing-heading">
          <div className="section-heading">
            <p className="section-kicker">Форматы и стоимость</p>
            <h2>
              Подбери подготовку
              <br />
              под себя
            </h2>
          </div>
          <p>
            Выберите цель и формат. Точную стоимость я назову после короткого
            знакомства — без скрытых доплат и сюрпризов.
          </p>
        </div>

        <div className="configurator">
          <div className="config-options">
            <div className="config-block">
              <span className="config-label">01 · цель</span>
              <div className="segmented-control">
                {programs.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className={program === item.id ? "active" : ""}
                    onClick={() => setProgram(item.id)}
                  >
                    {item.id}
                  </button>
                ))}
              </div>
            </div>
            <div className="config-block">
              <span className="config-label">02 · формат</span>
              <div className="format-choice">
                {(["Мини-группа", "Индивидуально"] as StudyFormat[]).map(
                  (item) => (
                    <button
                      type="button"
                      key={item}
                      className={studyFormat === item ? "active" : ""}
                      onClick={() => setStudyFormat(item)}
                    >
                      <span className="fake-radio" />
                      <strong>{item}</strong>
                      <small>
                        {item === "Мини-группа"
                          ? "до 8 учеников"
                          : "личный темп"}
                      </small>
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="config-summary">
            <span className="summary-badge">ваш вариант</span>
            <div>
              <p>{program}</p>
              <h3>{studyFormat}</h3>
            </div>
            <ul>
              <li>занятия напрямую со мной</li>
              <li>мои материалы и практика</li>
              <li>личный разбор вопросов</li>
              <li>регулярная проверка прогресса мной</li>
            </ul>
            <div className="price-note">
              <span>стоимость</span>
              <strong>назову после знакомства</strong>
            </div>
            <a className="summary-button" href="#trial">
              Получить расчёт <span>→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="trial-section section" id="trial">
        <div className="trial-intro">
          <p className="section-kicker">Первый шаг</p>
          <h2>Встретимся и всё обсудим.</h2>
          <p>
            На пробном занятии познакомимся, обсудим цель и наметим первые шаги подготовки.
          </p>
        </div>

        <div className="planerka-booking-card">
          <div className="planerka-booking-meta">
            <span>Пробное занятие</span>
            <span>60 минут · онлайн</span>
          </div>
          <h3>Выбери удобное время</h3>
          <p>В календаре показаны свободные часы в твоём часовом поясе.</p>
          <a
            className="planerka-booking-button"
            href="https://planerka.app/ilandroxy/first-lesson"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              if (bookingDialogRef.current?.showModal) {
                event.preventDefault();
                setBookingFrameLoaded(false);
                setBookingLoadSlow(false);
                setBookingOpen(true);
                bookingDialogRef.current.showModal();
              }
            }}
          >
            Открыть календарь <span aria-hidden="true">↗</span>
          </a>
          <span className="planerka-booking-footnote">Запись подтвердится в Планёрке</span>
        </div>
        <dialog
          className="planerka-booking-dialog"
          ref={bookingDialogRef}
          onClose={() => setBookingOpen(false)}
          aria-label="Запись на пробное занятие"
        >
          <div className="planerka-booking-dialog-header">
            <strong>Пробное занятие · 60 минут</strong>
            <a href="https://planerka.app/ilandroxy/first-lesson">
              Открыть отдельно ↗
            </a>
            <button type="button" onClick={() => bookingDialogRef.current?.close()} aria-label="Закрыть календарь">×</button>
          </div>
          {bookingOpen && (
            <iframe
              title="Календарь записи на пробное занятие в Планёрке"
              src="https://planerka.app/ilandroxy/first-lesson?embed=1"
              onLoad={() => setBookingFrameLoaded(true)}
            />
          )}
          {bookingLoadSlow && !bookingFrameLoaded && (
            <div className="planerka-booking-dialog-help" role="status">
              <strong>Календарь долго загружается</strong>
              <p>Можно выбрать время прямо на странице Планёрки.</p>
              <a href="https://planerka.app/ilandroxy/first-lesson">Перейти к записи ↗</a>
            </div>
          )}
        </dialog>
      </section>
      <section className="faq-section section" id="faq">
        <div className="faq-heading">
          <div className="section-heading">
            <p className="section-kicker">FAQ</p>
            <h2>
              Часто спрашивают.
              <br />
              Отвечаю по делу
            </h2>
          </div>
          <div className="faq-symbol">?</div>
        </div>

        <div className="faq-list">
          {faqs.map((item, index) => (
            <details key={item.q} open={index === 0}>
              <summary>
                <strong>{item.q}</strong>
                <i>+</i>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>

        <div className="faq-contact-card">
          <span>{"</>"}</span>
          <div>
            <strong>Не нашли свой вопрос?</strong>
            <p>Напишите ITPY — разберёмся вместе.</p>
          </div>
          <a href="#trial">Обсудить подготовку →</a>
        </div>
      </section>

      <footer className="site-footer" id="contacts">
        <LinkHub />
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ITPY</span>
          <a href="#top">Наверх ↑</a>
        </div>
      </footer>
    </main>
  );
}
