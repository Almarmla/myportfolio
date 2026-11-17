import Link from "next/link";
import { Suspense } from "react";

type ProfileAdminPageProps = {
  searchParams: Promise<{ uploaded?: string | string[] }>;
};

async function UploadStatus({ searchParams }: ProfileAdminPageProps) {
  const params = await searchParams;

  if (params.uploaded !== "1") {
    return null;
  }

  return (
    <p
      role="status"
      className="mt-6 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300"
    >
      Profile photo updated.
    </p>
  );
}

export default function ProfileAdminPage({
  searchParams,
}: ProfileAdminPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 items-center px-6 py-24">
      <section className="w-full rounded-3xl border border-zinc-200 bg-white/70 p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/60">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
          Owner settings
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Update profile photo
        </h1>
        <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Upload a JPEG, PNG, or WebP image up to 4 MB. The homepage and About
          section will use the same photo.
        </p>

        <Suspense fallback={null}>
          <UploadStatus searchParams={searchParams} />
        </Suspense>

        <form
          action="/api/profile-photo"
          method="post"
          encType="multipart/form-data"
          className="mt-8 space-y-5"
        >
          <div>
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
              Choose a photo
            </label>
            <input
              id="photo"
              name="photo"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              required
              className="mt-2 block w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-800 dark:border-zinc-700 dark:bg-zinc-950/60 dark:text-zinc-100"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Upload profile photo
          </button>
        </form>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-full px-1 py-2 text-sm font-medium text-zinc-600 transition-colors hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400"
        >
          Back to portfolio
        </Link>
      </section>
    </main>
  );
}
