"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  DollarSign,
  Users,
  CalendarDays,
  Clock,
  User,
  Phone,
  Mail,
  Home,
  Globe,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  MessageCircle,
  Clock3,
  ShieldCheck,
  Star,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/provider/Language";
import { translations, getSafe } from "@/lib/translations";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ToastState {
  show: boolean;
  type: "success" | "error" | null;
  title: string;
  message: string;
}

type FormFields = {
  tripName: string;
  budgetRange: string;
  numberOfTravelers: string;
  travelDate: string;
  duration: string;
  fullName: string;
  whatsAppNumber: string;
  emailAddress: string;
  streetAddress: string;
  country: string;
  referral: string;
  specialRequirements: string;
  comments: string;
};

type FieldErrors = Partial<Record<keyof FormFields, string>>;

// ─── Step config (labels are dynamic) ────────────────────────────────────────

const STEPS = [{ id: 1 }, { id: 2 }, { id: 3 }];

const SELECT_CHEVRON =
  "bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2362748e%27 stroke-width=%272.5%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpolyline points=%276 9 12 15 18 9%27/%3E%3C/svg%3E')] bg-[length:12px] bg-no-repeat bg-[right_0.75rem_center]";

const inputBase =
  "w-full rounded-xl border border-border bg-muted text-sm text-foreground outline-none transition-[border-color,box-shadow,background] duration-200 focus:border-accent focus:bg-background focus:ring-[3px] focus:ring-accent/15 placeholder:text-muted-foreground/70 appearance-none";

const inputIconClass = cn(inputBase, "py-3 pr-3.5 pl-9");
const inputPlainClass = cn(inputBase, "px-3.5 py-3");
const selectIconClass = cn(
  inputIconClass,
  SELECT_CHEVRON,
  "cursor-pointer pr-8",
);
const selectPlainClass = cn(
  inputPlainClass,
  SELECT_CHEVRON,
  "cursor-pointer pr-8",
);
const textareaClass = cn(
  inputPlainClass,
  "min-h-[4.5rem] resize-y leading-relaxed",
);

const inputErrorClass =
  "border-destructive bg-red-50/50 focus:border-destructive focus:ring-destructive/15";

// ─── Validation rules ─────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts: +977-9841234567 / +1 234 567 890 / 0044 1234 567890 etc.
const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/;

function validateStep1(data: FormFields): FieldErrors {
  const errors: FieldErrors = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!data.tripName.trim()) {
    errors.tripName = "Please enter a destination or trip name.";
  }
  if (!data.budgetRange) {
    errors.budgetRange = "Please select a budget range.";
  }
  if (!data.numberOfTravelers) {
    errors.numberOfTravelers = "Please select the number of travelers.";
  }
  if (!data.travelDate) {
    errors.travelDate = "Please pick a travel date.";
  } else {
    const picked = new Date(data.travelDate);
    if (isNaN(picked.getTime())) {
      errors.travelDate = "That date looks invalid — please re-enter it.";
    } else if (picked < today) {
      errors.travelDate = "Travel date must be today or in the future.";
    }
  }
  if (!data.duration) {
    errors.duration = "Please enter the trip duration.";
  }

  return errors;
}

function validateStep2(data: FormFields): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Your full name is required.";
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name (at least 2 characters).";
  }
  if (!data.whatsAppNumber.trim()) {
    errors.whatsAppNumber =
      "A WhatsApp number is required so we can reach you.";
  } else if (!PHONE_RE.test(data.whatsAppNumber.trim())) {
    errors.whatsAppNumber = "Enter a valid phone number, e.g. +1 234 567 890.";
  }
  if (!data.emailAddress.trim()) {
    errors.emailAddress = "Email address is required.";
  } else if (!EMAIL_RE.test(data.emailAddress.trim())) {
    errors.emailAddress = "Please enter a valid email address.";
  }
  if (!data.country.trim()) {
    errors.country = "Country of residence is required.";
  }

  return errors;
}

function validateStep3(data: FormFields): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.referral) {
    errors.referral = "Please tell us how you found us.";
  }
  return errors;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Field({
  label,
  hint,
  icon,
  error,
  children,
  full,
}: {
  label: string;
  hint?: string;
  icon?: React.ElementType;
  error?: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  const Icon = icon;

  return (
    <div className={cn("flex flex-col gap-1.5", full && "col-span-full")}>
      <label className="text-[0.8125rem] font-semibold tracking-tight text-foreground">
        {label}
      </label>
      {hint && (
        <p className="m-0 text-xs leading-snug text-muted-foreground">{hint}</p>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <span className="pointer-events-none absolute left-3 flex items-center text-muted-foreground">
            <Icon size={15} strokeWidth={1.8} />
          </span>
        )}
        {children}
      </div>
      {error && (
        <span
          className="mt-0.5 flex items-start gap-1 text-xs font-medium text-destructive"
          role="alert"
        >
          <AlertCircle size={12} strokeWidth={2.2} className="mt-px shrink-0" />
          {error}
        </span>
      )}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PlanYourTripSection() {
  const { language } = useLanguage();
  const t = getSafe("planYourTrip", language, translations.en.planYourTrip);

  const ERRORS = {
    en: {
      tripName: "Please enter a destination or trip name.",
      budgetRange: "Please select a budget range.",
      numberOfTravelers: "Please select the number of travelers.",
      travelDate: "Please pick a travel date.",
      travelDateInvalid: "That date looks invalid — please re-enter it.",
      travelDatePast: "Travel date must be today or in the future.",
      duration: "Please enter the trip duration.",
      durationInvalid: "Duration must be a whole number of at least 1 day.",
      fullName: "Your full name is required.",
      fullNameShort: "Please enter your full name (at least 2 characters).",
      whatsAppNumber: "A WhatsApp number is required so we can reach you.",
      whatsAppInvalid: "Enter a valid phone number, e.g. +1 234 567 890.",
      emailAddress: "Email address is required.",
      emailInvalid: "Please enter a valid email address.",
      country: "Country of residence is required.",
      referral: "Please tell us how you found us.",
    },
    es: {
      tripName: "Por favor, ingrese un destino o nombre de viaje.",
      budgetRange: "Por favor, seleccione un rango de presupuesto.",
      numberOfTravelers: "Por favor, seleccione el número de viajeros.",
      travelDate: "Por favor, elija una fecha de viaje.",
      travelDateInvalid: "Esa fecha no es válida, por favor corríjala.",
      travelDatePast: "La fecha de viaje debe ser hoy o en el futuro.",
      duration: "Por favor, ingrese la duración del viaje.",
      durationInvalid:
        "La duración debe ser un número entero de al menos 1 día.",
      fullName: "Su nombre completo es requerido.",
      fullNameShort:
        "Por favor, ingrese su nombre completo (al menos 2 caracteres).",
      whatsAppNumber: "Se requiere un número de WhatsApp para contactarle.",
      whatsAppInvalid:
        "Ingrese un número de teléfono válido, ej. +34 600 000 000.",
      emailAddress: "Se requiere correo electrónico.",
      emailInvalid: "Por favor, ingrese un correo electrónico válido.",
      country: "País de residencia es requerido.",
      referral: "Por favor, díganos cómo nos encontró.",
    },
    fr: {
      tripName: "Veuillez entrer une destination ou un nom de voyage.",
      budgetRange: "Veuillez sélectionner une tranche de budget.",
      numberOfTravelers: "Veuillez sélectionner le nombre de voyageurs.",
      travelDate: "Veuillez choisir une date de voyage.",
      travelDateInvalid: "Cette date semble invalide, veuillez la corriger.",
      travelDatePast:
        "La date de voyage doit être aujourd'hui ou dans le futur.",
      duration: "Veuillez entrer la durée du voyage.",
      durationInvalid: "La durée doit être un nombre entier d'au moins 1 jour.",
      fullName: "Votre nom complet est requis.",
      fullNameShort:
        "Veuillez entrer votre nom complet (au moins 2 caractères).",
      whatsAppNumber: "Un numéro WhatsApp est requis pour vous contacter.",
      whatsAppInvalid:
        "Entrez un numéro de téléphone valide, ex. +33 6 1234 5678.",
      emailAddress: "L'adresse e-mail est requise.",
      emailInvalid: "Veuillez entrer une adresse e-mail valide.",
      country: "Pays de résidence requis.",
      referral: "Veuillez nous dire comment vous avez entendu parler de nous.",
    },
  };

  const err =
    language === "en" ? ERRORS.en : language === "es" ? ERRORS.es : ERRORS.fr;

  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<FormFields>({
    tripName: "",
    budgetRange: "",
    numberOfTravelers: "",
    travelDate: "",
    duration: "",
    fullName: "",
    whatsAppNumber: "",
    emailAddress: "",
    streetAddress: "",
    country: "",
    referral: "",
    specialRequirements: "",
    comments: "",
  });

  // Per-field errors; only shown after the user attempts to advance/submit
  const [errors, setErrors] = useState<FieldErrors>({});
  // Track whether user has attempted to advance from each step
  const [touched, setTouched] = useState({ 1: false, 2: false, 3: false });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: null,
    title: "",
    message: "",
  });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Re-validate live once the user has already attempted to advance
  useEffect(() => {
    if (touched[1] && currentStep === 1) setErrors(validateStep1(formData));
  }, [formData, currentStep, touched]);

  useEffect(() => {
    if (touched[2] && currentStep === 2) setErrors(validateStep2(formData));
  }, [formData, currentStep, touched]);

  useEffect(() => {
    if (touched[3] && currentStep === 3) setErrors(validateStep3(formData));
  }, [formData, currentStep, touched]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const triggerToast = (
    type: "success" | "error",
    title: string,
    message: string,
  ) => {
    setToast({ show: true, type, title, message });
  };

  // ── Step navigation with validation ───────────────────────────────────────

  const goToStep2 = () => {
    setTouched((t) => ({ ...t, 1: true }));
    const errs = validateStep1(formData);
    setErrors(errs);
    if (Object.keys(errs).length === 0) setCurrentStep(2);
  };

  const goToStep3 = () => {
    setTouched((t) => ({ ...t, 2: true }));
    const errs = validateStep2(formData);
    setErrors(errs);
    if (Object.keys(errs).length === 0) setCurrentStep(3);
  };

  const goBack = (to: number) => {
    setErrors({});
    setCurrentStep(to);
  };

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched((t) => ({ ...t, 3: true }));
    const errs = validateStep3(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/plan-your-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        triggerToast(
          "success",
          "Inquiry Submitted!",
          "Your dream itinerary requests have been successfully delivered to our specialized guides.",
        );
        setFormData({
          tripName: "",
          budgetRange: "",
          numberOfTravelers: "",
          travelDate: "",
          duration: "",
          fullName: "",
          whatsAppNumber: "",
          emailAddress: "",
          streetAddress: "",
          country: "",
          referral: "",
          specialRequirements: "",
          comments: "",
        });
        setErrors({});
        setTouched({ 1: false, 2: false, 3: false });
        setCurrentStep(1);
      } else {
        throw new Error(data.error || "Failed to sync form entry parameters.");
      }
    } catch (error: any) {
      triggerToast(
        "error",
        "Submission Failed",
        error.message ||
          "We could not route your request via SMTP. Check your connectivity.",
      );
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Utility: input class based on error state ──────────────────────────────

  const ic = (field: keyof FormFields, base: string) =>
    cn(base, errors[field] && inputErrorClass);

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <section className="relative min-h-screen bg-secondary px-4 py-28">
      {/* Toast */}
      <div className="pointer-events-none fixed top-6 right-6 z-[9999] flex w-full max-w-sm flex-col items-end gap-3">
        {toast.show && (
          <div
            className={cn(
              "pointer-events-auto w-full overflow-hidden rounded-xl bg-card shadow-xl animate-in slide-in-from-right-full duration-300",
              toast.type === "success" && "border border-accent/30",
              toast.type === "error" && "border border-destructive/30",
            )}
          >
            <div className="flex items-start gap-3 p-4">
              {toast.type === "success" ? (
                <CheckCircle2
                  size={20}
                  className="mt-px shrink-0 text-accent"
                />
              ) : (
                <AlertCircle
                  size={20}
                  className="mt-px shrink-0 text-destructive"
                />
              )}
              <div className="min-w-0 flex-1">
                <strong className="mb-0.5 block text-sm font-bold text-foreground">
                  {toast.title}
                </strong>
                <span className="text-xs leading-snug text-muted-foreground">
                  {toast.message}
                </span>
              </div>
              <button
                type="button"
                className="flex shrink-0 items-center text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setToast((prev) => ({ ...prev, show: false }))}
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

      <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_300px]">
        {/* Form card */}
        <div className="overflow-hidden rounded-[1.25rem] border border-border bg-card shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <div className="px-9 pt-9 text-center">
            <h1 className="!mb-2 !text-3xl !font-bold tracking-tight text-foreground">
              {t.title}
            </h1>
            <p className="mx-auto max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground">
              {t.description}
            </p>
          </div>

          {/* Stepper */}
          <div
            className="flex items-center justify-center px-9 pt-7"
            aria-label="Form progress"
          >
            {STEPS.map((step, index) => {
              const done = currentStep > step.id;
              const active = currentStep === step.id;
              const isLast = index === STEPS.length - 1;
              const stepLabels = [
                t.sections?.tripInfo,
                t.sections?.personalInfo,
                t.sections?.additionalDetails,
              ];

              return (
                <div
                  key={step.id}
                  className={cn(
                    "relative flex flex-1 flex-col items-center gap-1.5",
                    !isLast &&
                      "after:absolute after:top-[1.0625rem] after:left-[calc(50%+1.0625rem)] after:z-0 after:h-0.5 after:w-[calc(100%-2.125rem)] after:bg-border after:transition-colors after:content-['']",
                    done && !isLast && "after:bg-foreground",
                  )}
                  aria-current={active ? "step" : undefined}
                >
                  <div
                    className={cn(
                      "relative z-10 flex size-[2.125rem] items-center justify-center rounded-full border-2 text-[0.8125rem] font-bold transition-all",
                      active &&
                        "border-accent bg-accent text-accent-foreground shadow-[0_0_0_4px_rgba(44,193,218,0.18)]",
                      done && "border-foreground bg-foreground text-background",
                      !active &&
                        !done &&
                        "border-border bg-secondary text-muted-foreground",
                    )}
                  >
                    {done ? <CheckCircle2 size={14} /> : step.id}
                  </div>
                  <span
                    className={cn(
                      "text-[0.6875rem] font-semibold tracking-wider whitespace-nowrap uppercase",
                      active && "text-accent",
                      done && "text-foreground",
                      !active && !done && "text-muted-foreground",
                    )}
                  >
                    {stepLabels[index]}
                  </span>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="px-9 pt-7 pb-9">
              {currentStep === 1 && (
                <>
                  <p className="mb-5 border-b border-border pb-2.5 text-[0.6875rem] font-bold tracking-widest text-muted-foreground uppercase">
                    {t.sections?.tripInfo}
                  </p>
                  <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
                    <Field
                      label={t.fields?.tripName}
                      icon={MapPin}
                      error={errors.tripName}
                      full
                    >
                      <input
                        type="text"
                        name="tripName"
                        id="tripName"
                        placeholder={t.fields?.tripNamePlaceholder}
                        value={formData.tripName}
                        onChange={handleChange}
                        className={ic("tripName", inputIconClass)}
                        aria-invalid={!!errors.tripName}
                      />
                    </Field>

                    <Field
                      label={t.fields?.budgetRange}
                      icon={DollarSign}
                      error={errors.budgetRange}
                    >
                      <select
                        name="budgetRange"
                        id="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleChange}
                        className={ic("budgetRange", selectIconClass)}
                        aria-invalid={!!errors.budgetRange}
                      >
                        <option value="">{t.fields?.budgetPlaceholder}</option>
                        {t.options?.budgets?.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field
                      label={t.fields?.numberOfTravelers}
                      icon={Users}
                      error={errors.numberOfTravelers}
                    >
                      <select
                        name="numberOfTravelers"
                        id="numberOfTravelers"
                        value={formData.numberOfTravelers}
                        onChange={handleChange}
                        className={ic("numberOfTravelers", selectIconClass)}
                        aria-invalid={!!errors.numberOfTravelers}
                      >
                        <option value="">
                          {t.fields?.travelersPlaceholder}
                        </option>
                        {t.options?.travelers?.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field
                      label={t.fields?.travelDate}
                      icon={CalendarDays}
                      error={errors.travelDate}
                    >
                      <input
                        type="date"
                        name="travelDate"
                        id="travelDate"
                        value={formData.travelDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        className={ic("travelDate", inputIconClass)}
                        aria-invalid={!!errors.travelDate}
                      />
                    </Field>

                    <Field
                      label="Trip Duration (Days)"
                      icon={Clock}
                      error={errors.duration}
                    >
                      <input
                        name="duration"
                        id="duration"
                        min="1"
                        placeholder="e.g., 14"
                        value={formData.duration}
                        onChange={handleChange}
                        className={ic("duration", inputIconClass)}
                        aria-invalid={!!errors.duration}
                      />
                    </Field>
                  </div>

                  <div className="mt-7 flex items-center justify-end border-t border-border pt-5">
                    <Button type="button" onClick={goToStep2}>
                      Next <ChevronRight size={15} />
                    </Button>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <p className="mb-5 border-b border-border pb-2.5 text-[0.6875rem] font-bold tracking-widest text-muted-foreground uppercase">
                    {t.sections?.personalInfo}
                  </p>
                  <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
                    <Field
                      label={t.fields?.fullName}
                      icon={User}
                      error={errors.fullName}
                      full
                    >
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder={t.fields?.fullNamePlaceholder}
                        value={formData.fullName}
                        onChange={handleChange}
                        className={ic("fullName", inputIconClass)}
                        aria-invalid={!!errors.fullName}
                      />
                    </Field>

                    <Field
                      label={t.fields?.whatsAppNumber}
                      icon={Phone}
                      error={errors.whatsAppNumber}
                    >
                      <input
                        type="tel"
                        name="whatsAppNumber"
                        id="whatsAppNumber"
                        placeholder={t.fields?.whatsAppPlaceholder}
                        value={formData.whatsAppNumber}
                        onChange={handleChange}
                        className={ic("whatsAppNumber", inputIconClass)}
                        aria-invalid={!!errors.whatsAppNumber}
                      />
                    </Field>

                    <Field
                      label={t.fields?.emailAddress}
                      icon={Mail}
                      error={errors.emailAddress}
                    >
                      <input
                        type="email"
                        name="emailAddress"
                        id="emailAddress"
                        placeholder={t.fields?.emailPlaceholder}
                        value={formData.emailAddress}
                        onChange={handleChange}
                        className={ic("emailAddress", inputIconClass)}
                        aria-invalid={!!errors.emailAddress}
                      />
                    </Field>

                    <Field label={t.fields?.streetAddress} icon={Home}>
                      <input
                        type="text"
                        name="streetAddress"
                        id="streetAddress"
                        placeholder={t.fields?.streetPlaceholder}
                        value={formData.streetAddress}
                        onChange={handleChange}
                        className={inputIconClass}
                      />
                    </Field>

                    <Field
                      label={t.fields?.country}
                      icon={Globe}
                      error={errors.country}
                    >
                      <input
                        type="text"
                        name="country"
                        id="country"
                        placeholder="e.g., United States"
                        value={formData.country}
                        onChange={handleChange}
                        className={ic("country", inputIconClass)}
                        aria-invalid={!!errors.country}
                      />
                    </Field>
                  </div>

                  <div className="mt-7 flex items-center justify-between border-t border-border pt-5">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => goBack(2)}
                    >
                      <ChevronLeft size={15} />{" "}
                      {t.sections?.tripInfo?.includes("Trip")
                        ? "Back"
                        : "Volver"}
                    </Button>
                    <Button type="button" onClick={goToStep3}>
                      Next <ChevronRight size={15} />
                    </Button>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <p className="mb-5 border-b border-border pb-2.5 text-[0.6875rem] font-bold tracking-widest text-muted-foreground uppercase">
                    {t.sections?.additionalDetails}
                  </p>
                  <div className="flex flex-col gap-4.5">
                    <Field label={t.fields?.referral} error={errors.referral}>
                      <select
                        name="referral"
                        id="referral"
                        value={formData.referral}
                        onChange={handleChange}
                        className={ic("referral", selectPlainClass)}
                        aria-invalid={!!errors.referral}
                      >
                        <option value="">
                          {t.fields?.referralPlaceholder}
                        </option>
                        {t.options?.referrals?.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field
                      label={t.fields?.specialRequirements}
                      hint={
                        t.fields?.specialRequirementsPlaceholder?.split(
                          ".",
                        )[0] + "."
                      }
                    >
                      <textarea
                        name="specialRequirements"
                        id="specialRequirements"
                        rows={3}
                        value={formData.specialRequirements}
                        onChange={handleChange}
                        className={textareaClass}
                      />
                    </Field>

                    <Field label={t.fields?.comments}>
                      <textarea
                        name="comments"
                        id="comments"
                        rows={4}
                        value={formData.comments}
                        onChange={handleChange}
                        className={textareaClass}
                      />
                    </Field>
                  </div>

                  <div className="mt-7 flex items-center justify-between pt-5">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => goBack(2)}
                    >
                      <ChevronLeft size={15} /> Back
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    width="full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending request…" : "Submit Plan Details"}
                  </Button>
                </>
              )}
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="order-first flex flex-col gap-4 lg:order-none">
          <div className="rounded-[1.25rem] border border-border bg-card p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            <h3 className="!mb-4 !text-[0.8125rem] !font-bold tracking-widest text-muted-foreground uppercase">
              Why book with us
            </h3>
            <div className="flex items-start gap-3 border-b border-border/60 py-2.5">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Clock3 size={16} />
              </div>
              <div>
                <strong className="mb-0.5 block text-[0.8125rem] font-bold text-foreground">
                  Reply within 24 hours
                </strong>
                <span className="text-xs leading-snug text-muted-foreground">
                  Our team responds to every inquiry, every day.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3 border-b border-border/60 py-2.5">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <ShieldCheck size={16} />
              </div>
              <div>
                <strong className="mb-0.5 block text-[0.8125rem] font-bold text-foreground">
                  Fully customised trips
                </strong>
                <span className="text-xs leading-snug text-muted-foreground">
                  No cookie-cutter packages — built around your schedule and
                  budget.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3 py-2.5 pb-0">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Star size={16} />
              </div>
              <div>
                <strong className="mb-0.5 block text-[0.8125rem] font-bold text-foreground">
                  10+ years of experience
                </strong>
                <span className="text-xs leading-snug text-muted-foreground">
                  Thousands of trekkers guided safely across Nepal.
                </span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <div className="flex gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                4.9 · 600+ reviews
              </span>
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-border bg-card p-6 text-center shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            <h3 className="!mb-4 !text-[0.8125rem] !font-bold tracking-widest text-muted-foreground uppercase">
              Prefer to chat directly?
            </h3>
            <a
              href="https://wa.me/9779800000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-3 text-sm font-bold text-white no-underline transition hover:bg-[#1da851] hover:shadow-[0_4px_14px_rgba(37,211,102,0.35)]"
            >
              <MessageCircle size={17} />
              Message us on WhatsApp
            </a>
            <p className="mt-2.5 text-xs leading-snug text-muted-foreground">
              Available 7 days a week · Usually replies within minutes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
