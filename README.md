# GM Techies – Technology Learning Platform

GM Techies is a full-stack technology education platform for learners, teachers, mentors, and administrators. It helps users discover courses, explore internships, follow learning roadmaps, prepare for interviews, and access expert mentorship.

The repository currently contains a responsive Next.js frontend built with React and TypeScript. This README documents both the implemented frontend and the recommended full-stack architecture for completing the platform.

> **Implementation status:** Course browsing, search, category filtering, themes, animations, and the contact UI are implemented. Authentication, database persistence, enrollment, and role dashboards are the proposed backend features described below.

## Features

### Learner

- Browse and search published courses
- Filter courses by category and level
- View course details, lessons, mentors, pricing, and student count
- Explore internship opportunities
- Follow learning roadmaps
- Practice company-specific interview preparation
- View technical skill resources and mentor profiles
- Enroll in courses and track lesson progress
- Submit reviews and contact requests
- Switch between light and dark themes

### Teacher / Mentor

- Sign in through role-based authentication
- Create and manage course drafts
- Add modules, lessons, videos, articles, quizzes, and resources
- Submit courses for administrator approval
- View enrolled learners and course progress
- Answer learner questions
- Manage mentor profile and expertise

### Administrator

- Manage learner, teacher, and administrator accounts
- Approve or reject teacher course submissions
- Publish, update, or remove courses
- Manage teachers and mentors
- Create, update, or close internship listings
- Manage learning roadmaps and testimonials
- Monitor enrollments and platform activity
- Review audit logs

## Technology Stack

| Area | Technology |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4 and custom CSS |
| Animation | Framer Motion, GSAP, Lenis |
| Media | Lottie and Next.js Image |
| Backend | Next.js Route Handlers or Express.js |
| Database | PostgreSQL |
| ORM | Prisma or Drizzle ORM |
| Authentication | NextAuth.js or secure JWT sessions |
| File Storage | Cloudinary, AWS S3, or Firebase Storage |
| Deployment | Vercel plus managed PostgreSQL |

## Project Structure

```text
app/
  layout.tsx          Root layout, fonts, metadata, and global CSS
  page.tsx            Main page composition and theme state
  globals.css         Global theme and styling

components/
  preloader/          Canvas and Lottie loading experience
  sections/
    Navbar.tsx        Navigation and theme controls
    Hero.tsx          Main landing section
    CourseCategories  Course search and category filtering
    FeaturedInternships.tsx
    InterviewPrep.tsx
    LearningRoadmaps.tsx
    TechnicalSkills.tsx
    Mentors.tsx
    Testimonials.tsx
    Contact.tsx
    Footer.tsx

public/
  assets/             Images and visual resources
```

## High-Level System Architecture

```text
Learners / Teachers / Administrators
                  |
                  | HTTPS
                  v
        Next.js Web Application
  Public pages and role-protected dashboards
                  |
                  | JSON / Server Actions
                  v
          API and Business Logic
Authentication, validation, authorization
                  |
         +--------+--------+
         |                 |
         v                 v
   PostgreSQL          Object Storage
Users, courses,       Course images, videos,
enrollments, progress  documents and profiles
```

### Application Request Flow

```text
Browser
  -> Next.js route or server action
  -> Authentication middleware
  -> Role and resource authorization
  -> Input and payload validation
  -> Controller or service
  -> Prisma/database operation
  -> PostgreSQL
  -> API response
  -> Reusable React component
```

Frontend route protection improves navigation and user experience, but authorization must always be enforced by the backend.

## Role-Based Application Flows

### Learner Flow

```text
Register or sign in
  -> Browse published courses
  -> Search or filter by category
  -> View course details and mentors
  -> Enroll in a course
  -> View lessons and resources
  -> Track lesson completion
  -> Submit a review
  -> Continue learning through the dashboard
```

Learners can view only published courses and their own enrollments, progress, and reviews.

### Teacher / Mentor Flow

```text
Sign in as a teacher
  -> Open teacher dashboard
  -> Create course draft
  -> Add modules and lessons
  -> Upload lesson media
  -> Submit course for review
  -> Receive approval or revision request
  -> Manage learner questions and progress
```

A teacher should be restricted to assigned or owned courses unless explicitly granted broader permissions.

### Administrator Flow

```text
Sign in as administrator
  -> Open admin dashboard
  -> Review pending courses
  -> Approve or reject course submissions
  -> Manage users and roles
  -> Publish or remove internships
  -> Manage roadmaps and testimonials
  -> Monitor enrollments and platform activity
  -> Review audit logs
```

## Database Design

PostgreSQL is recommended because the platform requires relationships between users, courses, lessons, enrollments, and progress.

### `users`

- `id` — UUID, primary key
- `name` — VARCHAR
- `email` — VARCHAR, unique
- `password_hash` — VARCHAR, nullable for OAuth users
- `role` — `LEARNER`, `TEACHER`, or `ADMIN`
- `status` — `ACTIVE` or `DISABLED`
- `profile_image_url` — VARCHAR, nullable
- `created_at` — TIMESTAMPTZ
- `updated_at` — TIMESTAMPTZ

### `courses`

- `id` — UUID, primary key
- `teacher_id` — UUID, foreign key referencing `users(id)`
- `title` — VARCHAR
- `slug` — VARCHAR, unique
- `short_description` — TEXT
- `description` — TEXT
- `category` — VARCHAR
- `level` — `BEGINNER`, `INTERMEDIATE`, or `ADVANCED`
- `price` — NUMERIC(10,2)
- `duration_hours` — INTEGER
- `thumbnail_url` — VARCHAR
- `status` — `DRAFT`, `PENDING`, `PUBLISHED`, or `UNPUBLISHED`
- `created_at` and `updated_at`

### `course_modules` and `lessons`

**`course_modules`**

- `id`
- `course_id` — foreign key referencing `courses(id)`
- `title`
- `description`
- `position`

**`lessons`**

- `id`
- `module_id` — foreign key referencing `course_modules(id)`
- `title`
- `content_type` — `VIDEO`, `ARTICLE`, or `QUIZ`
- `content_url`
- `content`
- `duration_minutes`
- `position`
- `is_free_preview`

### `enrollments`

- `id` — UUID, primary key
- `learner_id` — foreign key referencing `users(id)`
- `course_id` — foreign key referencing `courses(id)`
- `status` — `ACTIVE`, `COMPLETED`, or `CANCELLED`
- `enrolled_at`
- `completed_at`, nullable

Add a unique constraint on (`learner_id`, `course_id`) to prevent duplicate enrollments.

### `lesson_progress`

- `id` — UUID, primary key
- `enrollment_id` — foreign key referencing `enrollments(id)`
- `lesson_id` — foreign key referencing `lessons(id)`
- `is_completed` — BOOLEAN
- `progress_percent` — INTEGER
- `completed_at`, nullable

Add a unique constraint on (`enrollment_id`, `lesson_id`).

### `internships`

- `id`
- `company_name`
- `title`
- `description`
- `location`
- `work_mode` — `REMOTE`, `HYBRID`, or `ONSITE`
- `duration_months`
- `stipend`
- `application_url`
- `status` — `DRAFT`, `PUBLISHED`, or `CLOSED`
- `deadline`
- `created_at` and `updated_at`

### `roadmaps` and `roadmap_items`

**`roadmaps`**

- `id`
- `title`
- `slug`, unique
- `description`
- `level` — `BEGINNER`, `INTERMEDIATE`, or `ADVANCED`
- `status` — `DRAFT` or `PUBLISHED`

**`roadmap_items`**

- `id`
- `roadmap_id`
- `title`
- `description`
- `course_id`, nullable
- `position`

### `mentors`

- `id`
- `user_id` — foreign key referencing `users(id)`
- `designation`
- `company`
- `bio`
- `expertise`
- `profile_image_url`
- `status` — `ACTIVE` or `INACTIVE`

### `course_reviews` and `testimonials`

**`course_reviews`**

- `id`
- `enrollment_id`
- `rating` — 1 through 5
- `comment`
- `created_at`

**`testimonials`**

- `id`
- `learner_id`, nullable
- `quote`
- `learner_name`
- `role_or_company`
- `status` — `PENDING`, `APPROVED`, or `REJECTED`

### `contact_messages` and `audit_logs`

**`contact_messages`**

- `id`
- `name`
- `email`
- `question`
- `status` — `NEW`, `IN_PROGRESS`, or `RESOLVED`
- `created_at`

**`audit_logs`**

- `id`
- `actor_id`
- `action`
- `entity_type`
- `entity_id`
- `previous_value`, nullable JSON
- `new_value`, nullable JSON
- `created_at`

## Suggested API Structure

```text
/api/auth/register
/api/auth/login
/api/auth/logout

/api/courses
/api/courses/:slug
/api/courses/:id/enroll

/api/learner/enrollments
/api/learner/progress

/api/teacher/courses
/api/teacher/courses/:id
/api/teacher/courses/:id/submit

/api/admin/users
/api/admin/courses/:id/approve
/api/admin/internships
/api/admin/roadmaps
/api/admin/testimonials
```

Protected routes must validate authentication, roles, ownership, payloads, and resource state.

## Authentication and Authorization

Use strong password hashing such as bcrypt or Argon2. For browser-based applications, prefer secure HTTP-only session cookies. JWT-based solutions should use short-lived access tokens and refresh-token rotation.

| Action | Learner | Teacher | Admin |
|---|:---:|:---:|:---:|
| Browse published courses | Yes | Yes | Yes |
| Enroll in a course | Yes | Optional | Optional |
| Create a course draft | No | Yes | Yes |
| Edit an owned course | No | Yes | Yes |
| Publish directly | No | No | Yes |
| Approve a course | No | No | Yes |
| Manage internships | No | No | Yes |
| Manage users and roles | No | No | Yes |

## Implementation Priorities

1. Replace hardcoded course, internship, mentor, road-map, and testimonial data with database-backed APIs.
2. Add secure authentication and role-based route protection.
3. Create database migrations for users, courses, modules, lessons, and enrollments.
4. Build the learner dashboard for enrollments and progress.
5. Build the teacher dashboard for course and lesson management.
6. Build the administrator dashboard for users and content moderation.
7. Connect the contact form to a server endpoint.
8. Integrate object storage for images and lesson media.
9. Add server-side validation and rate limiting.
10. Add integration, authorization, and data-integrity tests.

## Frontend Data Flow

### Course Catalog

```text
CourseCategories
  -> GET /api/courses
  -> React search state
  -> Filter by title and category
  -> Render matching course cards
```

### Contact Form

```text
Validate required fields
  -> POST /api/contact
  -> Persist or forward the message
  -> Return success
  -> Update UI state
```

### Course Enrollment

```text
Verify authenticated learner
  -> Check that the course is published
  -> Create an enrollment
  -> Initialize lesson progress
  -> Redirect to the learner dashboard
```

## Performance and Reliability

- Paginate large course and internship lists.
- Add indexes to foreign keys, slugs, categories, statuses, and timestamps.
- Cache public content when appropriate.
- Use database transactions for enrollment and progress updates.
- Provide loading and skeleton states.
- Respect reduced-motion preferences.
- Optimize and deliver images through a CDN.
- Use environment-specific database configurations.

## Security Considerations

- Never rely only on hidden frontend controls for authorization.
- Hash passwords with an adaptive hashing algorithm.
- Keep secrets in environment variables.
- Validate every API payload on the server.
- Sanitize rich-text content and validate uploaded file types.
- Apply rate limiting to authentication and contact endpoints.
- Use signed uploads or server-authorized object-storage URLs.
- Record sensitive admin actions in audit logs.

## Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/gm_techies
AUTH_SECRET=replace-with-a-long-random-secret
AUTH_URL=http://localhost:3000
STORAGE_PROVIDER=cloudinary
STORAGE_API_KEY=your-api-key
STORAGE_API_SECRET=your-api-secret
```

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Before production:

```bash
npm run lint
npm run build
npm run start
```

## Development Roadmap

- [ ] Database models and migrations
- [ ] Registration and login
- [ ] Learner, teacher, and administrator roles
- [ ] Protected dashboards
- [ ] Dynamic course catalog
- [ ] Enrollment and learning progress
- [ ] Internship management
- [ ] Teacher course-submission workflow
- [ ] Administrator approval workflow
- [ ] Media uploads
- [ ] Contact form persistence
- [ ] Automated tests and CI/CD

## License

Add a project license before distributing or publishing the repository.
