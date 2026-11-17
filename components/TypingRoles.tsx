"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const ROLES = ["Web Developer", "Problem Solver", "IT Student"] as const;

const TYPING_SPEED = 90;
const DELETING_SPEED = 45;
const HOLD_DURATION = 1600;
const RESTART_DELAY = 300;

type Phase = "typing" | "deleting";

export default function TypingRoles({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState<string>(ROLES[0]);
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const role = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < role.length) {
        timeout = setTimeout(
          () => setText(role.slice(0, text.length + 1)),
          TYPING_SPEED,
        );
      } else {
        timeout = setTimeout(() => setPhase("deleting"), HOLD_DURATION);
      }
    } else if (text.length > 0) {
      timeout = setTimeout(
        () => setText(role.slice(0, text.length - 1)),
        DELETING_SPEED,
      );
    } else {
      timeout = setTimeout(() => {
        setRoleIndex((index) => (index + 1) % ROLES.length);
        setPhase("typing");
      }, RESTART_DELAY);
    }

    return () => clearTimeout(timeout);
  }, [phase, roleIndex, text, shouldReduceMotion]);

  return (
    <span className={className}>
      <span aria-hidden="true" className="motion-reduce:hidden">
        {text}
        <span className="ml-0.5 inline-block h-[1em] w-0.5 animate-pulse rounded-full bg-emerald-600 align-[-0.1em] motion-reduce:animate-none dark:bg-emerald-400" />
      </span>
      <span aria-hidden="true" className="hidden motion-reduce:inline">
        Web Developer, Problem Solver &amp; IT Student
      </span>
      <span className="sr-only">
        Web Developer, Problem Solver, and IT Student
      </span>
    </span>
  );
}
