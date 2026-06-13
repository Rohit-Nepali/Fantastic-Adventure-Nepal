"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";

interface FormProps {
  t: any;
  triggerToast: (type: "success" | "error", title: string, message: string) => void;
}

export default function InquiryForm({ t, triggerToast }: FormProps) {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    whatsapp: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/partner-with-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || data.error || "Failed to submit inquiry.");
      }

      triggerToast("success", t.toasts.successTitle, t.toasts.successMsg);
      setFormData({ company: "", name: "", email: "", whatsapp: "", message: "" });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t.toasts.errorMsg;
      triggerToast("error", t.toasts.errorTitle, errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="b2b-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="form-info-animate space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.benefits.title}
          </h2>
          <p className="text-slate-600 leading-relaxed">{t.benefits.description}</p>

          <div className="space-y-4 pt-4">
            {t.benefits.list.map((benefit: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2CC1DA] shrink-0 mt-0.5" />
                <p className="text-slate-700 font-medium text-sm">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="form-card-animate bg-white border border-slate-200 shadow-xl rounded-xl p-8 lg:p-10">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">{t.form.title}</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                {t.form.companyLabel}
              </label>
              <input
                type="text"
                required
                placeholder={t.form.companyPlaceholder}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2CC1DA] focus:ring-2 focus:ring-[#2CC1DA]/10 transition duration-200"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                  {t.form.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.form.namePlaceholder}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2CC1DA] focus:ring-2 focus:ring-[#2CC1DA]/10 transition duration-200"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                  {t.form.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  placeholder={t.form.emailPlaceholder}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2CC1DA] focus:ring-2 focus:ring-[#2CC1DA]/10 transition duration-200"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                {t.form.phoneLabel}
              </label>
              <input
                type="tel"
                required
                placeholder={t.form.phonePlaceholder}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2CC1DA] focus:ring-2 focus:ring-[#2CC1DA]/10 transition duration-200"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                {t.form.msgLabel}
              </label>
              <textarea
                rows={4}
                placeholder={t.form.msgPlaceholder}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2CC1DA] focus:ring-2 focus:ring-[#2CC1DA]/10 transition duration-200 resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <Button type="submit" variant="accent" width="full" loading={isSubmitting} disabled={isSubmitting}>
              {isSubmitting ? t.form.btnSubmitting : t.form.btnSubmit}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}