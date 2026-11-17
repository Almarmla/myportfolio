# Almar Portfolio

Personal portfolio for Almar, an IT student in Zimbabwe. The site presents my background, skills, experience, services, and project case studies with a focus on software built for local communities.

Built with Next.js App Router, React, TypeScript, Tailwind CSS v4, Framer Motion, and Vercel Analytics.

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm

### Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run start
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

| Path | Purpose |
| --- | --- |
| `app/` | Pages, layout, metadata, sitemap, and robots |
| `components/` | Page sections and shared UI |
| `data/projects.ts` | Project content and case-study data |
| `data/services.ts` | Services and contact subject options |
| `data/social.ts` | Email, GitHub, and LinkedIn links |
| `lib/site.ts` | Site title, description, URL, and OG image metadata |
| `public/` | Profile photo, project images, CV, and OG image |
| `proxy.ts` | Returns a real 404 for unknown project URLs |

## Editing content

Most content lives in the component that renders it:

- **Hero and stats:** `components/Hero.tsx`
- **Profile photo:** upload from `/admin/profile` after configuring Vercel Blob; `public/images/profile.jpg` is the local fallback
- **About:** `components/About.tsx`
- **Skills:** `components/Skills.tsx`
- **Experience:** `components/Experience.tsx`
- **Achievements:** `components/Achievements.tsx`
- **Services:** `data/services.ts`
- **Contact links and form copy:** `components/Contact.tsx`
- **Social links:** `data/social.ts`
- **CV:** replace `public/cv.pdf`
- **Site title, description, and URL fallback:** `lib/site.ts`
- **Social preview image:** replace `public/og-image.png`

## Adding a new project

Public, non-fork GitHub repositories are listed automatically in the project
section and refresh within about five minutes after a push. Private, forked,
and archived repositories are not shown. Repositories already featured as
curated case studies are not duplicated.

1. Add the project image and screenshots to `public/images/`.
2. Add a new object to the `projects` array in `data/projects.ts`:

```ts
{
  id: "my-new-project",
  title: "My New Project",
  description: "A short summary shown on the project card.",
  problemSolved: "The problem this project addresses.",
  solution: "How the project solves it.",
  features: ["Feature one", "Feature two"],
  techStack: ["Next.js", "TypeScript"],
  category: "Web App",
  image: "/images/my-new-project.jpg",
  screenshots: ["/images/my-new-project-1.jpg"],
  liveUrl: "https://example.com",
  githubUrl: "https://github.com/username/repo",
  learned: "What I learned while building it.",
}
```

3. Use a unique, URL-safe `id`. It becomes the case-study route: `/projects/my-new-project`.
4. Leave `liveUrl` or `githubUrl` as an empty string if a link is not available; the corresponding button renders disabled.
5. The project grid, category filters, case-study page, and sitemap update automatically. No new route file is needed.

## Contact form

The contact form opens a prefilled email to the address in `data/profile.ts`. The visitor sends it from their email app.

## Owner profile photo uploads

The owner-only upload page is `/admin/profile`. It accepts JPEG, PNG, and WebP files up to 4 MB.

1. Create a **public** Vercel Blob store and connect it to this Vercel project.
2. Set `PROFILE_ADMIN_PASSWORD` in the local and deployment environments. The browser asks for username `owner` and this password. Use a strong password and never commit it.
3. Vercel supplies `BLOB_STORE_ID` and OIDC credentials when the store is connected. For local development, link the project and run `vercel env pull`, or configure `BLOB_READ_WRITE_TOKEN`.
4. Visit `/admin/profile` and upload a photo. The homepage and About section both use the latest uploaded image.

If Blob storage is not configured, the site uses `public/images/profile.jpg`.

## Environment variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

This value is used for canonical URLs, Open Graph URLs, the sitemap, and robots. Restart the development server after changing it. If unset, the site falls back to `https://almar.example.com`.

## Deployment

The site is ready to deploy on Vercel:

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Add the `NEXT_PUBLIC_SITE_URL` environment variable for the production domain.
4. Deploy. The default build command is `npm run build`.

`proxy.ts` runs on the Node.js server, so deploy to a Node.js host or Vercel. Static export is not supported.

## Verification

Before deploying, run:

```bash
npm run lint
npm run build
```

Then check the home page, project filters, contact form, CV download, and `/projects/smart-elderly-care` in a browser.
