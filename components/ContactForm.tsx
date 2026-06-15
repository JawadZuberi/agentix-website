"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, budgets, type ContactInput } from "@/lib/contactSchema";
import { services, contactInfo } from "@/lib/content";

const serviceOptions = [...services.map((s) => s.title), "Not sure yet"];

const field =
  "w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-fg placeholder:text-faint outline-none transition-colors focus:border-line-strong focus:ring-2 focus:ring-accent/40";
const labelCls = "mb-2 block text-sm font-medium text-fg";
const errorCls = "mt-1.5 text-xs text-accent-red";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    setStatus("sending");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Something went wrong.");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-3xl border-grad bg-surface/40 p-10 text-center">
        <div className="grid size-14 place-items-center rounded-full bg-grad text-2xl text-white">
          ✓
        </div>
        <h3 className="display mt-5 text-2xl font-semibold">Message sent.</h3>
        <p className="mt-2 max-w-sm text-muted">
          Thanks — we&rsquo;ll get back to you within one business day. Want to add
          more detail?
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-gradient"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-line bg-surface/40 p-7 sm:p-9"
      noValidate
    >
      {/* Honeypot — visually hidden, off-screen, not tab-focusable. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="name">
            Name
          </label>
          <input id="name" className={field} placeholder="Jane Doe" {...register("name")} />
          {errors.name && <p className={errorCls}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={field}
            placeholder="jane@company.com"
            {...register("email")}
          />
          {errors.email && <p className={errorCls}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="phone">
            Phone <span className="text-faint">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            className={field}
            placeholder="+1 (555) 000-0000"
            {...register("phone")}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="company">
            Company <span className="text-faint">(optional)</span>
          </label>
          <input
            id="company"
            className={field}
            placeholder="Company Inc."
            {...register("company")}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="service">
            Service Interested In <span className="text-faint">(optional)</span>
          </label>
          <select id="service" className={field} defaultValue="" {...register("service")}>
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((s) => (
              <option key={s} value={s} className="bg-surface text-fg">
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="budget">
            Budget <span className="text-faint">(optional)</span>
          </label>
          <select id="budget" className={field} defaultValue="" {...register("budget")}>
            <option value="" disabled>
              Select a range
            </option>
            {budgets.map((b) => (
              <option key={b} value={b} className="bg-surface text-fg">
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className={labelCls} htmlFor="message">
          What do you want to build?
        </label>
        <textarea
          id="message"
          rows={5}
          className={`${field} resize-none`}
          placeholder="Tell us the outcome you're after — an agent, an automation, a site, an app…"
          {...register("message")}
        />
        {errors.message && <p className={errorCls}>{errors.message.message}</p>}
      </div>

      {serverError && (
        <p className="mt-4 rounded-lg border border-accent-red/40 bg-accent-red/10 px-4 py-3 text-sm text-accent-red">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-grad px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_-20px_#7a2e8f] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : contactInfo.cta}
      </button>
    </form>
  );
}
