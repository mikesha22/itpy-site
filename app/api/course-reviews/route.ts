const allowedCourses = new Set([203477, 122969, 282248]);

type StepikReview = {
  id: number;
  course: number;
  user: number;
  score: number;
  text: string;
  create_date: string;
};

type StepikUser = { id: number; full_name?: string };

export async function GET(request: Request) {
  const courseId = Number(new URL(request.url).searchParams.get("course"));
  if (!allowedCourses.has(courseId)) {
    return Response.json({ error: "Неизвестный курс" }, { status: 400 });
  }

  try {
    const reviewUrl = new URL("https://stepik.org/api/course-reviews");
    reviewUrl.searchParams.set("course", String(courseId));
    reviewUrl.searchParams.set("page_size", "50");

    const response = await fetch(reviewUrl, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`Stepik reviews: ${response.status}`);

    const data = (await response.json()) as { "course-reviews"?: StepikReview[] };
    const reviews = (data["course-reviews"] ?? []).filter(
      (review) => review.course === courseId && typeof review.text === "string" && review.text.trim(),
    );

    const userIds = [...new Set(reviews.map((review) => review.user))];
    const users = new Map<number, string>();
    if (userIds.length) {
      try {
        const usersUrl = new URL("https://stepik.org/api/users");
        userIds.forEach((id) => usersUrl.searchParams.append("ids[]", String(id)));
        const usersResponse = await fetch(usersUrl, {
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(10000),
        });
        if (usersResponse.ok) {
          const usersData = (await usersResponse.json()) as { users?: StepikUser[] };
          (usersData.users ?? []).forEach((user) => {
            if (user.full_name) users.set(user.id, user.full_name);
          });
        }
      } catch {
        // Text remains available even if Stepik's user endpoint is unavailable.
      }
    }

    return Response.json(
      {
        reviews: reviews.map((review) => ({
          id: review.id,
          userId: review.user,
          name: users.get(review.user) ?? `Ученик Stepik #${review.user}`,
          score: review.score,
          text: review.text,
          createdAt: review.create_date,
        })),
      },
      { headers: { "Cache-Control": "public, max-age=0, s-maxage=900" } },
    );
  } catch {
    return Response.json({ error: "Не удалось загрузить отзывы со Stepik" }, { status: 502 });
  }
}
