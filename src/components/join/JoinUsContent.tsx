"use client";

import Image from "next/image";
import { useState } from "react";

export function JoinUsContent() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      setMessage("Thank you — we’re glad you’re here.");
      setName("");
      setPhone("");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Could not reach the server. Please try again.");
    }
  }

  return (
    <article className="space-y-6 pb-8 pt-1 text-stone-200">
      <header className="space-y-3 border-b border-violet-500/15 pb-6">
        <h1 className="text-xl font-semibold leading-snug text-amber-50 sm:text-2xl">Join Us</h1>
        <p className="text-sm leading-relaxed text-stone-300">
          You’re invited deeper into the rhythm — not as a transaction, but as relationship. Leave your
          details if you’d like to stay connected as this community grows.
        </p>
      </header>

      <div className="relative mx-auto aspect-[4/3] w-full max-w-sm overflow-hidden rounded-2xl border border-amber-200/15 bg-slate-900/50 shadow-lg shadow-violet-950/40">
        <Image
          src="/images/jesus_welcome.png"
          alt=""
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 100vw, 20rem"
          priority={false}
        />
      </div>

      <div className="space-y-3 text-sm leading-relaxed text-stone-400">
        <p>
          There is no fee and no obligation — only an open door. Sharing the app with someone who might
          need it is welcome anytime; this form is simply a way to say you’d like to walk alongside us.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 pt-2">
        <div className="space-y-1.5">
          <label htmlFor="join-name" className="text-xs font-medium uppercase tracking-[0.15em] text-stone-500">
            Name
          </label>
          <input
            id="join-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-violet-500/25 bg-slate-900/80 px-3 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-amber-200/40 focus:outline-none focus:ring-1 focus:ring-amber-200/30"
            placeholder="Your name"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="join-phone" className="text-xs font-medium uppercase tracking-[0.15em] text-stone-500">
            Phone
          </label>
          <input
            id="join-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-violet-500/25 bg-slate-900/80 px-3 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-amber-200/40 focus:outline-none focus:ring-1 focus:ring-amber-200/30"
            placeholder="Phone number"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="join-email" className="text-xs font-medium uppercase tracking-[0.15em] text-stone-500">
            Email
          </label>
          <input
            id="join-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-violet-500/25 bg-slate-900/80 px-3 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-amber-200/40 focus:outline-none focus:ring-1 focus:ring-amber-200/30"
            placeholder="Email address"
          />
        </div>

        {message && (
          <p
            className={`text-sm ${
              status === "success" ? "text-emerald-400/95" : status === "error" ? "text-red-300/95" : "text-amber-200/90"
            }`}
            role="status"
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-xl border border-amber-200/35 bg-violet-700/85 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-amber-50 transition-colors hover:bg-violet-600/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? "Sending…" : "Send"}
        </button>
      </form>

      <footer className="border-t border-violet-500/15 pt-6 text-center text-xs leading-relaxed text-stone-500">
        <a
          href="mailto:privacyemail369@gmail.com"
          className="text-amber-200/80 underline decoration-amber-200/25 underline-offset-2 transition-colors hover:text-amber-50 hover:decoration-amber-200/50"
        >
          privacyemail369@gmail.com
        </a>
      </footer>
    </article>
  );
}
