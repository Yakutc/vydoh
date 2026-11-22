"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

export function EmailCta() {
  const [email, setEmail] = useState("");

  return (
    <form
      className="mt-8 max-w-[28rem]"
      onSubmit={(event) => {
        event.preventDefault();
        if (!email) return;

        const subject = encodeURIComponent("ВЫДОХ — план на 21 день");
        const body = encodeURIComponent(
          `Привет. Хочу получить план на 21 день.\n\nМоя почта: ${email}`,
        );
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      }}
    >
      <label
        htmlFor="email"
        className="eyebrow text-eyebrow text-ink-muted"
      >
        Почта
      </label>

      <div className="mt-2 flex items-center gap-3 border-b border-ink/30 pb-2 transition-colors duration-300 focus-within:border-accent">
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="имя@example.com"
          aria-describedby="email-note"
          className="w-full bg-transparent py-2 font-body text-body text-ink outline-none placeholder:text-ink-faint"
        />
        <button
          type="submit"
          className="link-under shrink-0 font-ui text-ui text-ink"
        >
          Прислать
        </button>
      </div>

      <p id="email-note" className="mt-3 text-small text-ink-muted">
        Откроется почта — письмо уже готово. Никаких рассылок без спроса.
      </p>
    </form>
  );
}
