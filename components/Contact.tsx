"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Reveal from "@/components/Reveal";
import SocialIcon from "@/components/SocialIcon";
import { profile } from "@/data/profile";
import { SERVICE_SELECT_EVENT, services } from "@/data/services";
import { socialLinks } from "@/data/social";
import type { SocialLink } from "@/data/social";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactFormCopy = {
  nameLabel: string;
  emailLabel: string;
  subjectLabel: string;
  messageLabel: string;
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
  validationSummary: string;
  nameError: string;
  emailError: string;
  messageError: string;
};

type ContactContent = {
  eyebrow: string;
  heading: string;
  name: string;
  description: string;
  links: SocialLink[];
  cvLabel: string;
  cvHref: string;
  form: ContactFormCopy;
};

const contactContent: ContactContent[] = [
  {
    eyebrow: "Contact",
    heading: "Let's build something useful",
    name: profile.name,
    description:
      "Have a project, an idea, or a question? Send me a message and I'll get back to you.",
    links: socialLinks,
    cvLabel: "Download CV",
    cvHref: profile.cvUrl,
    form: {
      nameLabel: "Name",
      emailLabel: "Email",
      subjectLabel: "Subject",
      messageLabel: "Message",
      submitLabel: "Send Message",
      successMessage:
        "Your email app will open with the message addressed to me. Review it and press Send to deliver it.",
      errorMessage:
        "Something went wrong while sending your message. Please try again in a moment.",
      validationSummary: "Please fix the highlighted fields and try again.",
      nameError: "Please enter your name.",
      emailError: "Please enter a valid email address.",
      messageError: "Please enter a message of at least 10 characters.",
    },
  },
];

const subjectOptions: string[] = [
  "General enquiry",
  ...services.map((service) => service.title),
];

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

function validateForm(
  values: ContactFormValues,
  messages: ContactFormCopy,
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name.trim()) {
    errors.name = messages.nameError;
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = messages.emailError;
  }

  if (values.message.trim().length < 10) {
    errors.message = messages.messageError;
  }

  return errors;
}

export default function Contact() {
  const [content] = contactContent;
  const [values, setValues] = useState<ContactFormValues>({
    name: "",
    email: "",
    subject: subjectOptions[0],
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const handleServiceSelected = (event: Event) => {
      const service = (event as CustomEvent<string>).detail;

      if (!subjectOptions.includes(service)) {
        return;
      }

      setValues((current) => ({ ...current, subject: service }));
      setStatus("idle");
      setFeedback("");
    };

    window.addEventListener(SERVICE_SELECT_EVENT, handleServiceSelected);

    return () => {
      window.removeEventListener(SERVICE_SELECT_EVENT, handleServiceSelected);
    };
  }, []);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const field = event.target.name as keyof ContactFormValues;
    const value = event.target.value;

    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));

    if (status !== "idle") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(values, content.form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      setFeedback(content.form.validationSummary);

      const firstInvalidField = (["name", "email", "message"] as const).find(
        (field) => nextErrors[field],
      );

      if (firstInvalidField) {
        document.getElementById(firstInvalidField)?.focus();
      }

      return;
    }

    setErrors({});
    const subject = encodeURIComponent(values.subject);
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
    );

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("success");
    setFeedback(content.form.successMessage);
  };

  const inputClasses = (hasError: boolean) =>
    `mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition-colors placeholder:text-zinc-500 focus:ring-2 dark:bg-zinc-950/60 dark:text-zinc-50 dark:placeholder:text-zinc-400 ${
      hasError
        ? "border-red-600 focus:border-red-600 focus:ring-red-600 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400"
        : "border-zinc-500 focus:border-emerald-700 focus:ring-emerald-600 dark:border-zinc-500 dark:focus:border-emerald-400 dark:focus:ring-emerald-400"
    }`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-16 border-t border-zinc-200/70 py-24 sm:py-28 dark:border-zinc-800/70"
    >
      <Reveal className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              {content.eyebrow}
            </p>
            <h2
              id="contact-heading"
              className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50"
            >
              {content.heading}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
              {content.description}
            </p>
            <p className="mt-6 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
              {content.name}
            </p>

            <div className="mt-4 space-y-3">
              {content.links.map((link) => {
                const isExternal = link.href.startsWith("http");

                return (
                  <a
                    key={`${link.icon}-${link.value}`}
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={`${link.label}: ${link.value}`}
                    className="group flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white/60 p-4 transition-colors hover:border-emerald-600/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-emerald-400/40"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400">
                      <SocialIcon icon={link.icon} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                        {link.label}
                      </span>
                      <span className="block truncate text-sm font-medium text-zinc-950 dark:text-zinc-50">
                        {link.value}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>

            <a
              href={content.cvHref}
              download
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:border-emerald-600 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
              </svg>
              {content.cvLabel}
            </a>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white/60 p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/40">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  {content.form.nameLabel}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={values.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={inputClasses(Boolean(errors.name))}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  {content.form.emailLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={inputClasses(Boolean(errors.email))}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  {content.form.subjectLabel}
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                  className={inputClasses(false)}
                >
                  {subjectOptions.map((subject) => (
                    <option
                      key={subject}
                      value={subject}
                      className="bg-white text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50"
                    >
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  {content.form.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  minLength={10}
                  value={values.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  className={`${inputClasses(Boolean(errors.message))} resize-y`}
                />
                {errors.message && (
                  <p
                    id="message-error"
                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              {feedback && (
                <p
                  role={status === "error" ? "alert" : "status"}
                  className={`rounded-xl px-4 py-3 text-sm ${
                    status === "success"
                      ? "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"
                      : "bg-red-500/10 text-red-700 dark:bg-red-400/10 dark:text-red-300"
                  }`}
                >
                  {feedback}
                </p>
              )}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {content.form.submitLabel}
              </button>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
