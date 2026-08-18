"use client";

import { FormEvent, useState } from "react";

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
    title: "Определяем точку старта",
    text: "На первой встрече знакомимся, смотрим текущий уровень и ставим понятную цель.",
    tag: "диагностика",
  },
  {
    number: "02",
    title: "Собираем личный маршрут",
    text: "Раскладываем подготовку по темам и неделям, чтобы двигаться без перегруза.",
    tag: "план",
  },
  {
    number: "03",
    title: "Учимся через практику",
    text: "Короткая теория, живой разбор и задачи — всё сразу закрепляем руками.",
    tag: "занятия",
  },
  {
    number: "04",
    title: "Следим за прогрессом",
    text: "Регулярные пробники показывают рост и помогают вовремя усилить слабые темы.",
    tag: "результат",
  },
];

const teacherPrinciples = [
  "Лично веду занятия",
  "Сам проверяю практику",
  "Отвечаю на вопросы напрямую",
  "Адаптирую темп под ученика",
];

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
  const [trialStep, setTrialStep] = useState(1);
  const [day, setDay] = useState("Завтра");
  const [time, setTime] = useState("16:00");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function submitTrial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    if (!name.trim() || !phone.trim()) {
      setSubmitError("Заполните имя и телефон — я использую их только для связи.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          program,
          studyFormat,
          day,
          time,
        }),
      });

      if (!response.ok) {
        throw new Error("Не удалось отправить заявку");
      }

      setTrialStep(4);
    } catch {
      setSubmitError(
        "Заявка пока не отправилась. Попробуйте ещё раз или напишите мне в Telegram.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function chooseProgram(nextProgram: Program) {
    setProgram(nextProgram);
  }

  return (
    <main>
      <section className="hero" id="top">
        <header className="site-header">
          <a className="header-logo" href="#top" aria-label="ITPY — на главную">
            <img
              src="/itpy-logo-original.png"
              alt="ITPY"
              width={2048}
              height={2048}
            />
          </a>

          <nav className="main-nav" aria-label="Основная навигация">
            <a href="#learning">Как учим</a>
            <a href="#courses">Направления</a>
            <a href="#results">Результаты</a>
            <a href="#about">Обо мне</a>
            <a href="#faq">FAQ</a>
          </nav>

          <a
            className="header-socials"
            href="#contacts"
            aria-label="Соцсети ITPY"
          >
            <img
              src="/itpy-socials.png"
              alt="YouTube, Telegram, VK — informatika_kege_itpy"
              width={1280}
              height={217}
            />
          </a>
        </header>

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
                <span className="learning-tag">{step.tag}</span>
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
              src="/media/teacher-diploma.png"
              alt="Илья Андрианов с дипломом бакалавра по информатике и вычислительной технике"
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
          <figure className="expertise-card expertise-card-wide">
            <img
              src="/media/teacher-official.png"
              alt="Илья Андрианов работает официально как индивидуальный предприниматель"
              width={2048}
              height={1536}
            />
          </figure>
          <figure className="expertise-card">
            <img
              src="/media/stepik-courses.png"
              alt="Авторские курсы Ильи Андрианова по Python и подготовке к ЕГЭ на Stepik"
              width={2048}
              height={1536}
            />
          </figure>
          <figure className="expertise-card">
            <img
              src="/media/video-platforms.png"
              alt="Обучающие видео Ильи Андрианова на YouTube, VK Видео и Rutube"
              width={2048}
              height={1536}
            />
          </figure>
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

      <section className="results-section section" id="results">
        <div className="results-heading">
          <div className="section-heading">
            <p className="section-kicker">Результаты</p>
            <h2>
              Отзывы учеников
              <br />и реальные баллы
            </h2>
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

        <div className="real-reviews">
          <figure className="review-image-card review-image-overview">
            <img
              src="/media/reviews-overview.png"
              alt="Рейтинг 5.0 и подборка отзывов учеников Ильи с результатами 85, 85, 93 и 88 баллов"
              width={2048}
              height={1536}
            />
          </figure>
          <figure className="review-image-card">
            <img
              src="/media/review-sergey.png"
              alt="Отзыв Сергея о подготовке к ЕГЭ по информатике, результат 98 баллов"
              width={2048}
              height={1536}
            />
          </figure>
          <figure className="review-image-card">
            <img
              src="/media/review-darya.png"
              alt="Отзыв Дарьи о подготовке к ЕГЭ по информатике, результаты 100 и 95 баллов"
              width={2048}
              height={1536}
            />
          </figure>
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
          <span className="trial-sticker">это бесплатно</span>
          <p className="section-kicker">Связаться со мной</p>
          <h2>
            Обсудить подготовку
            <span>↘</span>
          </h2>
          <p>
            Оставьте имя и удобный контакт. Я лично отвечу, уточню задачу и
            предложу подходящий вариант занятий.
          </p>
        </div>

        <form className="simple-contact-form" onSubmit={submitTrial}>
          {trialStep === 4 ? (
            <div className="simple-contact-success" role="status">
              <span>✓</span>
              <div>
                <h3>Заявка отправлена</h3>
                <p>Я лично свяжусь с вами и спокойно отвечу на вопросы.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="simple-contact-group">
                <span className="simple-contact-label">Цель подготовки</span>
                <div className="simple-choice-row">
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

              <div className="simple-contact-group">
                <span className="simple-contact-label">Формат</span>
                <div className="simple-choice-row simple-choice-row-format">
                  {(["Мини-группа", "Индивидуально"] as StudyFormat[]).map(
                    (item) => (
                      <button
                        type="button"
                        key={item}
                        className={studyFormat === item ? "active" : ""}
                        onClick={() => setStudyFormat(item)}
                      >
                        {item}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="simple-contact-fields">
                <label className="form-field">
                  <span>Как вас зовут?</span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Имя"
                    autoComplete="name"
                    maxLength={80}
                  />
                </label>
                <label className="form-field">
                  <span>Телефон или Telegram</span>
                  <input
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="+7 999 000-00-00"
                    autoComplete="tel"
                    maxLength={80}
                  />
                </label>
              </div>

              {submitError && <p className="form-error">{submitError}</p>}
              <button
                className="simple-contact-submit"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправляю..." : "Обсудить подготовку"}
                {!isSubmitting && <span>→</span>}
              </button>
              <p className="privacy-note">
                Контакт нужен только для ответа по заявке.
              </p>
            </>
          )}
        </form>

        <form className="trial-form trial-form-legacy" onSubmit={submitTrial}>
          <div className="trial-progress" aria-label="Шаги записи">
            {["Программа", "Время", "Контакты"].map((label, index) => (
              <div
                className={
                  trialStep >= index + 1
                    ? "trial-progress-step active"
                    : "trial-progress-step"
                }
                key={label}
              >
                <span>{index + 1}</span>
                <small>{label}</small>
              </div>
            ))}
          </div>

          {trialStep === 1 && (
            <div className="trial-panel">
              <span className="trial-panel-label">Что вас интересует?</span>
              <div className="trial-program-grid">
                {programs.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={program === item.id ? "active" : ""}
                    onClick={() => setProgram(item.id)}
                  >
                    <span>{item.code}</span>
                    <strong>{item.title}</strong>
                  </button>
                ))}
              </div>
              <span className="trial-panel-label">Как хочется заниматься?</span>
              <div className="trial-format-row">
                {(["Мини-группа", "Индивидуально"] as StudyFormat[]).map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      className={studyFormat === item ? "active" : ""}
                      onClick={() => setStudyFormat(item)}
                    >
                      {item}
                    </button>
                  ),
                )}
              </div>
              <button
                className="trial-next"
                type="button"
                onClick={() => setTrialStep(2)}
              >
                Выбрать время <span>→</span>
              </button>
            </div>
          )}

          {trialStep === 2 && (
            <div className="trial-panel">
              <span className="trial-panel-label">Выберите день</span>
              <div className="trial-days">
                {["Завтра", "Послезавтра", "В течение недели"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={day === item ? "active" : ""}
                    onClick={() => setDay(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <span className="trial-panel-label">Удобное время</span>
              <div className="trial-times">
                {["12:00", "14:00", "16:00", "18:00", "19:30"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={time === item ? "active" : ""}
                    onClick={() => setTime(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="trial-navigation">
                <button type="button" onClick={() => setTrialStep(1)}>
                  ← Назад
                </button>
                <button
                  className="trial-next"
                  type="button"
                  onClick={() => setTrialStep(3)}
                >
                  Продолжить <span>→</span>
                </button>
              </div>
            </div>
          )}

          {trialStep === 3 && (
            <div className="trial-panel">
              <div className="trial-summary-line">
                <span>{program}</span>
                <span>{studyFormat}</span>
                <span>{day}</span>
                <span>{time}</span>
              </div>
              <label className="form-field">
                <span>Как вас зовут?</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Имя"
                  autoComplete="name"
                  maxLength={80}
                />
              </label>
              <label className="form-field">
                <span>Телефон или Telegram</span>
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="+7 999 000-00-00"
                  autoComplete="tel"
                  maxLength={80}
                />
              </label>
              {submitError && <p className="form-error">{submitError}</p>}
              <div className="trial-navigation">
                <button type="button" onClick={() => setTrialStep(2)}>
                  ← Назад
                </button>
                <button
                  className="trial-next"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Отправляем..." : "Записаться"}
                  {!isSubmitting && <span>→</span>}
                </button>
              </div>
              <p className="privacy-note">
                Нажимая кнопку, вы соглашаетесь на обработку данных для связи по
                заявке.
              </p>
            </div>
          )}

          {trialStep === 4 && (
            <div className="trial-success" role="status">
              <span>✓</span>
              <h3>Заявка у нас!</h3>
              <p>
                Я свяжусь с вами, подтвержу время и отвечу на вопросы.
              </p>
            </div>
          )}
        </form>
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
                <span>{String(index + 1).padStart(2, "0")}</span>
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
          <a href="#contacts">Перейти к контактам →</a>
        </div>
      </section>

      <footer className="site-footer" id="contacts">
        <div className="footer-top">
          <div>
            <span className="footer-logo-crop">
              <img
                src="/itpy-logo-original.png"
                alt="ITPY"
                width={2048}
                height={2048}
              />
            </span>
            <p>Информатика, которую ты понимаешь.</p>
          </div>
          <a className="footer-cta" href="#trial">
            Обсудить подготовку <span>↗</span>
          </a>
        </div>
        <div className="footer-links">
          <div>
            <span>Навигация</span>
            <a href="#learning">Как учим</a>
            <a href="#courses">Направления</a>
            <a href="#about">Обо мне</a>
          </div>
          <div>
            <span>Связь</span>
            <p>Мои официальные страницы и контакты</p>
            <img
              className="socials-plaque"
              src="/itpy-socials.png"
              alt="YouTube, Telegram, VK — informatika_kege_itpy"
              width={1280}
              height={217}
            />
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ITPY</span>
          <span>Сделано с любовью к информатике {"</>"}</span>
        </div>
      </footer>
    </main>
  );
}
