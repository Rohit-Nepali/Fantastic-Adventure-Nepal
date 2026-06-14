"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, AlertCircle } from "lucide-react";

import { useLanguage } from "@/provider/Language";
import { translations } from "@/lib/translations";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function ContactSection() {
  const { language } = useLanguage();
  const copy = translations[language].contact;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    type: null as "success" | "error" | null,
    title: "",
    message: "",
  });

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: leftRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: rightRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".contact-info-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({
          ...prev,
          show: false,
        }));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const triggerToast = (
    type: "success" | "error",
    title: string,
    message: string
  ) => {
    setToast({
      show: true,
      type,
      title,
      message,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            data.error ||
            "Failed to send message."
        );
      }

      triggerToast(
        "success",
        "Message Sent!",
        "Your inquiry has been successfully delivered. We will contact you soon."
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        destination: "",
        message: "",
      });
    } catch (error) {
      triggerToast(
        "error",
        "Submission Failed",
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again."
      );

      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputClass =
    "w-full px-4 py-3 bg-black/[0.03] border border-black/10 rounded-xl text-black text-[14px] font-light font-sans placeholder:text-black/25 focus:outline-none focus:border-black/30 transition-colors duration-300";

  const labelClass =
    "block text-[11px] tracking-[2px] uppercase text-black/35 font-sans font-light mb-2";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-white overflow-hidden px-6 md:px-10 py-16 md:py-24"
    >
      {/* Toast */}
      <div className="pointer-events-none fixed top-6 right-6 z-[9999] flex w-full max-w-sm flex-col items-end gap-3">
        {toast.show && (
          <div
            className={cn(
              "pointer-events-auto w-full overflow-hidden rounded-xl bg-white shadow-2xl animate-in slide-in-from-right-full duration-300 border",
              toast.type === "success" &&
                "border-emerald-200",
              toast.type === "error" && "border-red-200"
            )}
          >
            <div className="flex items-start gap-3 p-4">
              {toast.type === "success" ? (
                <CheckCircle2
                  size={20}
                  className="mt-px shrink-0 text-emerald-500"
                />
              ) : (
                <AlertCircle
                  size={20}
                  className="mt-px shrink-0 text-red-500"
                />
              )}

              <div className="min-w-0 flex-1">
                <strong className="mb-0.5 block text-sm font-semibold text-black">
                  {toast.title}
                </strong>

                <span className="text-xs leading-relaxed text-black/60">
                  {toast.message}
                </span>
              </div>

              <button
                type="button"
                className="flex shrink-0 items-center text-black/40 transition-colors hover:text-black"
                onClick={() =>
                  setToast((prev) => ({
                    ...prev,
                    show: false,
                  }))
                }
                aria-label="Close notification"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        {/* LEFT — Info */}
        <div ref={leftRef}>
          <p className="text-[11px] tracking-[3px] uppercase text-black/35 font-light mb-3 font-sans">
            {copy.label}
          </p>

          <h2 className="text-3xl md:text-5xl font-semibold text-black leading-[1.15] tracking-tight mb-5">
            {copy.titleLead}{" "}
            <span className="text-black/30 font-light italic">
              {copy.titleAccent}
            </span>
          </h2>

          <p className="text-black/45 text-[14px] leading-relaxed font-light font-sans max-w-sm mb-12">
            {copy.description}
          </p>

          <p className="mb-6">
            <Link
              href="/documents"
              className="text-accent font-medium underline"
            >
              Documents and Preparation for Trekking in Nepal
            </Link>
          </p>

          <div className="space-y-0 border-t border-black/8 rounded-2xl overflow-hidden bg-black/[0.02]">
            {copy.info.map((item) => (
              <div
                key={item.label}
                className="contact-info-item flex items-start justify-between px-6 py-5 border-b border-black/8 last:border-b-0"
              >
                <p className="text-[11px] tracking-[2px] uppercase text-black/30 font-sans font-light w-24 flex-shrink-0 pt-0.5">
                  {item.label}
                </p>

                <div className="text-right">
                  {item.lines.map((line, i) => (
                    <p
                      key={i}
                      className="text-[13px] text-black/60 font-light font-sans leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Form */}
        <div
          ref={rightRef}
          className="flex flex-col justify-center"
        >
          <p className="text-[11px] tracking-[3px] uppercase text-black/30 font-sans font-light mb-8">
            {copy.form.header}
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid md:grid-cols-1 gap-5">
              <div>
                <label
                  htmlFor="name"
                  className={labelClass}
                >
                  {copy.form.name}
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder={copy.form.namePlaceholder}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className={labelClass}
                >
                  {copy.form.email}
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder={copy.form.emailPlaceholder}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-1 gap-5">
              <div>
                <label
                  htmlFor="phone"
                  className={labelClass}
                >
                  {copy.form.phone}
                </label>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder={copy.form.phonePlaceholder}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className={labelClass}
              >
                {copy.form.message}
              </label>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className={inputClass + " resize-none"}
                placeholder={copy.form.messagePlaceholder}
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="accent"
                width="full"
                rounded="xl"
                loading={isSubmitting}
                disabled={isSubmitting}
                className="text-[12px] tracking-[0.15em] uppercase font-sans font-medium py-4"
              >
                {isSubmitting
                  ? "Sending..."
                  : copy.form.submit}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}