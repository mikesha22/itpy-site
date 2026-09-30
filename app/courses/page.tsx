import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../SiteHeader";
import LinkHub from "../LinkHub";
import CourseReviews from "./CourseReviews";

export const metadata: Metadata = {
  title: "Мои курсы — ITPY",
  description: "Курсы ITPY по Python, подготовке к ЕГЭ по информатике и сборники вариантов.",
};

const courses = [
  {
    id: "python", number: "01", label: "Начать с основ", title: "Курс по Python", tone: "violet",
    description: "Короткая теория и много практики для тех, кто начинает программировать. Задания постепенно становятся сложнее, а к трудной теме можно вернуться в любой момент.",
    materials: ["Видео и теория", "Тесты и задачи", "Обсуждения и помощь"],
    url: "https://stepik.org/course/203477/info",
  },
  {
    id: "ege", number: "02", label: "Готовиться к экзамену", title: "Курс по ЕГЭ", tone: "blue",
    description: "Подборка заданий по информатике: сначала база ФИПИ, затем более сложная практика. Подходит для последовательной подготовки и разбора решений.",
    materials: ["Задания по темам", "Домашняя и практическая части", "Форум решений"],
    url: "https://stepik.org/course/122969/info",
  },
  {
    id: "collections", number: "03", label: "Проверить готовность", title: "Сборники", tone: "peach",
    description: "Официальные варианты ЕГЭ по информатике — материал для пробников и самостоятельной проверки перед экзаменом.",
    materials: ["Полные варианты", "Задания в формате экзамена", "Практика перед пробником"],
    url: "https://stepik.org/course/282248/info",
  },
] as const;

export default function CoursesPage() {
  return (
    <main className="course-page" id="top">
      <SiteHeader active="courses" />
      <section className="courses-hero">
        <p className="section-kicker">ITPY / материалы</p>
        <h1>Мои курсы<span>.</span></h1>
        <p>Три способа заниматься самостоятельно: освоить Python, решать задания ЕГЭ и тренироваться на полных вариантах.</p>
        <nav className="course-jump" aria-label="Курсы на странице">
          {courses.map((course) => <a href={`#${course.id}`} key={course.id}>{course.number} {course.title} ↘</a>)}
        </nav>
      </section>

      <section className="course-list" aria-label="Список курсов">
        {courses.map((course) => (
          <article id={course.id} className={`course-detail course-detail-${course.tone}`} key={course.id}>
            <div className="course-detail-art">
              <img src="/course-cover-stepik.jpg" alt={`Обложка курса «${course.title}» на Stepik`} width="230" height="230" />
              <small>ITPY / {course.number}</small>
            </div>
            <div className="course-detail-copy">
              <span className="course-detail-label">{course.number} / {course.label}</span>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <div className="course-materials"><strong>Внутри курса</strong><ul>{course.materials.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div className="course-detail-actions">
                <a className="course-detail-link" href={course.url} target="_blank" rel="noopener noreferrer">Смотреть на Stepik <span aria-hidden="true">↗</span></a>
                {course.id === "python" && <CourseReviews courseId={203477} title="Курс по Python" />}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="courses-contact">
        <div><p className="section-kicker">Если нужна помощь</p><h2>Хочешь заниматься вместе?</h2><p>Разберём твою цель и подберём формат занятий.</p></div>
        <Link href="/#trial">Заниматься со мной ↗</Link>
      </section>
      <footer className="site-footer" id="contacts">
        <LinkHub />
        <div className="footer-bottom"><span>© {new Date().getFullYear()} ITPY</span><a href="#top">Наверх ↑</a></div>
      </footer>
    </main>
  );
}
