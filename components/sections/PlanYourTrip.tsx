"use client";

import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ToastState {
  show: boolean;
  type: 'success' | 'error' | null;
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

// ─── Step config ──────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: 'Trip Details' },
  { id: 2, label: 'About You' },
  { id: 3, label: 'Extras' },
];

// ─── Validation rules ─────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts: +977-9841234567 / +1 234 567 890 / 0044 1234 567890 etc.
const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/;

function validateStep1(data: FormFields): FieldErrors {
  const errors: FieldErrors = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!data.tripName.trim()) {
    errors.tripName = 'Please enter a destination or trip name.';
  }
  if (!data.budgetRange) {
    errors.budgetRange = 'Please select a budget range.';
  }
  if (!data.numberOfTravelers) {
    errors.numberOfTravelers = 'Please select the number of travelers.';
  }
  if (!data.travelDate) {
    errors.travelDate = 'Please pick a travel date.';
  } else {
    const picked = new Date(data.travelDate);
    if (isNaN(picked.getTime())) {
      errors.travelDate = 'That date looks invalid — please re-enter it.';
    } else if (picked < today) {
      errors.travelDate = 'Travel date must be today or in the future.';
    }
  }
  if (!data.duration) {
    errors.duration = 'Please enter the trip duration.';
  } else if (Number(data.duration) < 1 || !Number.isInteger(Number(data.duration))) {
    errors.duration = 'Duration must be a whole number of at least 1 day.';
  }

  return errors;
}

function validateStep2(data: FormFields): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = 'Your full name is required.';
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }
  if (!data.whatsAppNumber.trim()) {
    errors.whatsAppNumber = 'A WhatsApp number is required so we can reach you.';
  } else if (!PHONE_RE.test(data.whatsAppNumber.trim())) {
    errors.whatsAppNumber = 'Enter a valid phone number, e.g. +1 234 567 890.';
  }
  if (!data.emailAddress.trim()) {
    errors.emailAddress = 'Email address is required.';
  } else if (!EMAIL_RE.test(data.emailAddress.trim())) {
    errors.emailAddress = 'Please enter a valid email address.';
  }
  if (!data.country.trim()) {
    errors.country = 'Country of residence is required.';
  }

  return errors;
}

function validateStep3(data: FormFields): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.referral) {
    errors.referral = 'Please tell us how you found us.';
  }
  return errors;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function InputIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <span className="pyt-input-icon">
      <Icon size={15} strokeWidth={1.8} />
    </span>
  );
}

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
  return (
    <div className={full ? 'pyt-field pyt-field--full' : 'pyt-field'}>
      <label className="pyt-label">{label}</label>
      {hint && <p className="pyt-hint">{hint}</p>}
      <div className="pyt-input-wrap">
        {icon && <InputIcon icon={icon} />}
        {children}
      </div>
      {error && (
        <span className="pyt-field-error" role="alert">
          <AlertCircle size={12} strokeWidth={2.2} style={{ flexShrink: 0, marginTop: '1px' }} />
          {error}
        </span>
      )}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PlanYourTripSection() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<FormFields>({
    tripName: '',
    budgetRange: '',
    numberOfTravelers: '',
    travelDate: '',
    duration: '',
    fullName: '',
    whatsAppNumber: '',
    emailAddress: '',
    streetAddress: '',
    country: '',
    referral: '',
    specialRequirements: '',
    comments: '',
  });

  // Per-field errors; only shown after the user attempts to advance/submit
  const [errors, setErrors] = useState<FieldErrors>({});
  // Track whether user has attempted to advance from each step
  const [touched, setTouched] = useState({ 1: false, 2: false, 3: false });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: null,
    title: '',
    message: '',
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const triggerToast = (type: 'success' | 'error', title: string, message: string) => {
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
      const response = await fetch('/api/plan-your-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        triggerToast(
          'success',
          'Inquiry Submitted!',
          'Your dream itinerary requests have been successfully delivered to our specialized guides.'
        );
        setFormData({
          tripName: '',
          budgetRange: '',
          numberOfTravelers: '',
          travelDate: '',
          duration: '',
          fullName: '',
          whatsAppNumber: '',
          emailAddress: '',
          streetAddress: '',
          country: '',
          referral: '',
          specialRequirements: '',
          comments: '',
        });
        setErrors({});
        setTouched({ 1: false, 2: false, 3: false });
        setCurrentStep(1);
      } else {
        throw new Error(data.error || 'Failed to sync form entry parameters.');
      }
    } catch (error: any) {
      triggerToast(
        'error',
        'Submission Failed',
        error.message || 'We could not route your request via SMTP. Check your connectivity.'
      );
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Utility: input class based on error state ──────────────────────────────

  const ic = (field: keyof FormFields, base: string) =>
    errors[field] ? `${base} pyt-input--error` : base;

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="pyt-root">

      {/* ── Scoped styles ─────────────────────────────────────────────────── */}
      <style>{`
        /* ── Root / page ── */
        .pyt-root {
          min-height: 100vh;
          padding: 7rem 1rem;
          background: #f4f1ea;
          position: relative;
          font-family: inherit;
        }

        /* ── Layout shell ── */
        .pyt-shell {
          max-width: 1080px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 2rem;
          align-items: start;
        }
        @media (max-width: 860px) {
          .pyt-shell { grid-template-columns: 1fr; }
          .pyt-sidebar { order: -1; }
        }

        /* ── Card ── */
        .pyt-card {
          background: #ffffff;
          border-radius: 1.25rem;
          border: 1px solid #e8e3d8;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          overflow: hidden;
        }

        /* ── Card header ── */
        .pyt-card-header {
          padding: 2.25rem 2.25rem 0;
          text-align: center;
        }
        .pyt-card-header h1 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #111111;
          letter-spacing: -0.025em;
          margin: 0 0 0.5rem;
        }
        .pyt-card-header p {
          font-size: 0.9375rem;
          color: #6b6456;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ── Stepper ── */
        .pyt-stepper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 1.75rem 2.25rem 0;
        }
        .pyt-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.375rem;
          position: relative;
          flex: 1;
        }
        .pyt-step-pill {
          width: 2.125rem;
          height: 2.125rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8125rem;
          font-weight: 700;
          transition: background 0.25s, border-color 0.25s, color 0.25s;
          position: relative;
          z-index: 1;
          border: 2px solid #d9d3c6;
          background: #f4f1ea;
          color: #9b9285;
        }
        .pyt-step--active .pyt-step-pill {
          background: #00b5c4;
          border-color: #00b5c4;
          color: #ffffff;
          box-shadow: 0 0 0 4px rgba(0,181,196,0.18);
        }
        .pyt-step--done .pyt-step-pill {
          background: #111111;
          border-color: #111111;
          color: #ffffff;
        }
        .pyt-step-label {
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #9b9285;
          white-space: nowrap;
        }
        .pyt-step--active .pyt-step-label { color: #00b5c4; }
        .pyt-step--done   .pyt-step-label { color: #111111; }
        /* connector line */
        .pyt-step:not(:last-child)::after {
          content: '';
          position: absolute;
          top: 1.0625rem;
          left: calc(50% + 1.0625rem);
          width: calc(100% - 2.125rem);
          height: 2px;
          background: #d9d3c6;
          transition: background 0.25s;
          z-index: 0;
        }
        .pyt-step--done:not(:last-child)::after { background: #111111; }

        /* ── Form body ── */
        .pyt-form-body {
          padding: 1.75rem 2.25rem 2.25rem;
        }

        /* ── Section heading ── */
        .pyt-section-heading {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #9b9285;
          margin: 0 0 1.25rem;
          padding-bottom: 0.625rem;
          border-bottom: 1px solid #e8e3d8;
        }

        /* ── Grid ── */
        .pyt-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.125rem;
        }
        @media (max-width: 560px) {
          .pyt-grid { grid-template-columns: 1fr; }
        }

        /* ── Field ── */
        .pyt-field {
          display: flex;
          flex-direction: column;
          gap: 0.3125rem;
        }
        .pyt-field--full {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          gap: 0.3125rem;
        }
        .pyt-label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #2a2520;
          letter-spacing: -0.005em;
        }
        .pyt-hint {
          font-size: 0.75rem;
          color: #9b9285;
          line-height: 1.45;
          margin: 0;
        }

        /* ── Inline field error ── */
        .pyt-field-error {
          display: flex;
          align-items: flex-start;
          gap: 0.3rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: #c0392b;
          line-height: 1.4;
          margin-top: 0.125rem;
          animation: pyt-err-in 0.18s ease-out both;
        }
        @keyframes pyt-err-in {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Input wrap ── */
        .pyt-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .pyt-input-icon {
          position: absolute;
          left: 0.75rem;
          color: #9b9285;
          pointer-events: none;
          display: flex;
          align-items: center;
          line-height: 1;
        }

        /* ── Shared input/select/textarea chrome ── */
        .pyt-input,
        .pyt-select,
        .pyt-textarea {
          width: 100%;
          border-radius: 0.75rem;
          border: 1.5px solid #d9d3c6;
          background: #faf9f6;
          color: #111111;
          font-size: 0.9rem;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
        }
        .pyt-input:focus,
        .pyt-select:focus,
        .pyt-textarea:focus {
          border-color: #00b5c4;
          box-shadow: 0 0 0 3px rgba(0,181,196,0.15);
          background: #ffffff;
        }
        .pyt-input::placeholder,
        .pyt-textarea::placeholder { color: #b8b0a4; }

        /* ── Error state overrides ── */
        .pyt-input--error,
        .pyt-input--error:focus,
        .pyt-select--error,
        .pyt-select--error:focus,
        .pyt-textarea--error,
        .pyt-textarea--error:focus {
          border-color: #e04343 !important;
          box-shadow: 0 0 0 3px rgba(224,67,67,0.12) !important;
          background: #fffafa !important;
        }

        /* ── Input padding variants ── */
        .pyt-input--icon  { padding: 0.75rem 0.875rem 0.75rem 2.375rem; }
        .pyt-input--plain { padding: 0.75rem 0.875rem; }
        .pyt-select--icon {
          padding: 0.75rem 2rem 0.75rem 2.375rem;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239b9285' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          cursor: pointer;
        }
        .pyt-select--plain {
          padding: 0.75rem 2rem 0.75rem 0.875rem;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239b9285' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          cursor: pointer;
        }
        .pyt-textarea {
          padding: 0.75rem 0.875rem;
          resize: vertical;
          min-height: 4.5rem;
          line-height: 1.55;
        }

/* ── Nav buttons ── */
        .pyt-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid #e8e3d8;
        }

        /* ── Sidebar ── */
        .pyt-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .pyt-trust-card {
          background: #ffffff;
          border-radius: 1.25rem;
          border: 1px solid #e8e3d8;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          padding: 1.5rem;
        }
        .pyt-trust-card h3 {
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #9b9285;
          margin: 0 0 1rem;
        }
        .pyt-trust-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.625rem 0;
          border-bottom: 1px solid #f0ece3;
        }
        .pyt-trust-item:last-child { border-bottom: none; padding-bottom: 0; }
        .pyt-trust-icon {
          width: 2rem;
          height: 2rem;
          border-radius: 0.5rem;
          background: #f0fafb;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #00b5c4;
        }
        .pyt-trust-text strong {
          display: block;
          font-size: 0.8125rem;
          font-weight: 700;
          color: #111111;
          margin-bottom: 0.125rem;
        }
        .pyt-trust-text span { font-size: 0.75rem; color: #9b9285; line-height: 1.4; }
        .pyt-whatsapp-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.875rem;
          background: #25D366;
          color: #ffffff;
          font-size: 0.875rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.18s, box-shadow 0.18s;
        }
        .pyt-whatsapp-btn:hover {
          background: #1da851;
          box-shadow: 0 4px 14px rgba(37,211,102,0.35);
        }
        .pyt-rating-row {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          margin-top: 0.75rem;
        }
        .pyt-stars { display: flex; gap: 2px; color: #f5a623; }
        .pyt-rating-text { font-size: 0.75rem; color: #9b9285; font-weight: 500; }

        /* ── Toast ── */
        .pyt-toast-wrap {
          position: fixed;
          top: 1.5rem;
          right: 1.5rem;
          z-index: 9999;
          max-width: 22rem;
          width: 100%;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.75rem;
        }
        .pyt-toast {
          pointer-events: auto;
          width: 100%;
          border-radius: 0.875rem;
          background: #ffffff;
          box-shadow: 0 8px 32px rgba(0,0,0,0.14);
          overflow: hidden;
          animation: pyt-slide-in 0.3s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .pyt-toast--success { border: 1.5px solid #b2e8ed; }
        .pyt-toast--error   { border: 1.5px solid #fcc2c2; }
        .pyt-toast-inner {
          padding: 1rem 1rem 0.875rem;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }
        .pyt-toast-icon { flex-shrink: 0; margin-top: 1px; }
        .pyt-toast-icon--success { color: #00b5c4; }
        .pyt-toast-icon--error   { color: #e04343; }
        .pyt-toast-body { flex: 1; min-width: 0; }
        .pyt-toast-body strong {
          display: block;
          font-size: 0.875rem;
          font-weight: 700;
          color: #111111;
          margin-bottom: 0.2rem;
        }
        .pyt-toast-body span { font-size: 0.75rem; color: #6b6456; line-height: 1.45; }
        .pyt-toast-close {
          flex-shrink: 0;
          background: none;
          border: none;
          color: #b8b0a4;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.15s;
        }
        .pyt-toast-close:hover { color: #111111; }
        .pyt-toast-bar { height: 3px; background: #f0ece3; }
        .pyt-toast-bar-fill { height: 100%; animation: pyt-countdown 5s linear forwards; }
        .pyt-toast--success .pyt-toast-bar-fill { background: #00b5c4; }
        .pyt-toast--error   .pyt-toast-bar-fill { background: #e04343; }

        @keyframes pyt-slide-in {
          from { transform: translateX(110%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes pyt-countdown {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>

      {/* ── Toast ───────────────────────────────────────────────────────── */}
      <div className="pyt-toast-wrap">
        {toast.show && (
          <div className={`pyt-toast pyt-toast--${toast.type}`}>
            <div className="pyt-toast-inner">
              <div className="pyt-toast-icon">
                {toast.type === 'success' ? (
                  <CheckCircle2 size={20} className="pyt-toast-icon--success" />
                ) : (
                  <svg className="pyt-toast-icon--error" width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div className="pyt-toast-body">
                <strong>{toast.title}</strong>
                <span>{toast.message}</span>
              </div>
              <button
                type="button"
                className="pyt-toast-close"
                onClick={() => setToast((prev) => ({ ...prev, show: false }))}
                aria-label="Close notification"
              >
                <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="pyt-toast-bar"><div className="pyt-toast-bar-fill" /></div>
          </div>
        )}
      </div>

      {/* ── Main shell ──────────────────────────────────────────────────── */}
      <div className="pyt-shell">

        {/* ── Form card ─────────────────────────────────────────────────── */}
        <div className="pyt-card">

          {/* Header */}
          <div className="pyt-card-header">
            <h1>Plan Your Trip</h1>
            <p>Tell us about your dream adventure in Nepal and our travel experts will craft a personalised itinerary for you.</p>
          </div>

          {/* Stepper */}
          <div className="pyt-stepper" aria-label="Form progress">
            {STEPS.map((step) => {
              const done = currentStep > step.id;
              const active = currentStep === step.id;
              return (
                <div
                  key={step.id}
                  className={`pyt-step${active ? ' pyt-step--active' : ''}${done ? ' pyt-step--done' : ''}`}
                  aria-current={active ? 'step' : undefined}
                >
                  <div className="pyt-step-pill">
                    {done ? <CheckCircle2 size={14} /> : step.id}
                  </div>
                  <span className="pyt-step-label">{step.label}</span>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="pyt-form-body">

              {/* ── Step 1: Trip Details ── */}
              {currentStep === 1 && (
                <>
                  <p className="pyt-section-heading">Trip Information</p>
                  <div className="pyt-grid">

                    <Field label="Trip Name / Destination" icon={MapPin} error={errors.tripName} full>
                      <input
                        type="text"
                        name="tripName"
                        id="tripName"
                        placeholder="e.g., Everest Base Camp Trek"
                        value={formData.tripName}
                        onChange={handleChange}
                        className={ic('tripName', 'pyt-input pyt-input--icon')}
                        aria-invalid={!!errors.tripName}
                      />
                    </Field>

                    <Field label="Estimated Budget (USD)" icon={DollarSign} error={errors.budgetRange}>
                      <select
                        name="budgetRange"
                        id="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleChange}
                        className={ic('budgetRange', 'pyt-select pyt-select--icon')}
                        aria-invalid={!!errors.budgetRange}
                      >
                        <option value="">Select a range</option>
                        <option value="Under $500">Under $500</option>
                        <option value="$500 – $1,000">$500 – $1,000</option>
                        <option value="$1,000 – $2,000">$1,000 – $2,000</option>
                        <option value="$2,000 – $5,000">$2,000 – $5,000</option>
                        <option value="Above $5000">Above $5,000</option>
                      </select>
                    </Field>

                    <Field label="Number of Travelers" icon={Users} error={errors.numberOfTravelers}>
                      <select
                        name="numberOfTravelers"
                        id="numberOfTravelers"
                        value={formData.numberOfTravelers}
                        onChange={handleChange}
                        className={ic('numberOfTravelers', 'pyt-select pyt-select--icon')}
                        aria-invalid={!!errors.numberOfTravelers}
                      >
                        <option value="">Select travelers</option>
                        <option value="Solo Traveler">Solo Traveler</option>
                        <option value="2 People">2 People</option>
                        <option value="3–5 People">3–5 People</option>
                        <option value="6–10 People">6–10 People</option>
                        <option value="10+ People">10+ People</option>
                      </select>
                    </Field>

                    <Field label="Preferred Travel Date" icon={CalendarDays} error={errors.travelDate}>
                      <input
                        type="date"
                        name="travelDate"
                        id="travelDate"
                        value={formData.travelDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className={ic('travelDate', 'pyt-input pyt-input--icon')}
                        aria-invalid={!!errors.travelDate}
                      />
                    </Field>

                    <Field label="Trip Duration (Days)" icon={Clock} error={errors.duration}>
                      <input
                        type="number"
                        name="duration"
                        id="duration"
                        min="1"
                        placeholder="e.g., 14"
                        value={formData.duration}
                        onChange={handleChange}
                        className={ic('duration', 'pyt-input pyt-input--icon')}
                        aria-invalid={!!errors.duration}
                      />
</Field>

                </div>

                <div className="pyt-nav" style={{ justifyContent: 'flex-end' }}>
                  <Button type="button" onClick={goToStep2}>
                    Next <ChevronRight size={15} />
                  </Button>
                </div>
              </>
            )}

              {/* ── Step 2: Personal Information ── */}
              {currentStep === 2 && (
                <>
                  <p className="pyt-section-heading">Personal Information</p>
                  <div className="pyt-grid">

                    <Field label="Full Name" icon={User} error={errors.fullName} full>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={ic('fullName', 'pyt-input pyt-input--icon')}
                        aria-invalid={!!errors.fullName}
                      />
                    </Field>

                    <Field label="WhatsApp Number" icon={Phone} error={errors.whatsAppNumber}>
                      <input
                        type="tel"
                        name="whatsAppNumber"
                        id="whatsAppNumber"
                        placeholder="+1 234 567 890"
                        value={formData.whatsAppNumber}
                        onChange={handleChange}
                        className={ic('whatsAppNumber', 'pyt-input pyt-input--icon')}
                        aria-invalid={!!errors.whatsAppNumber}
                      />
                    </Field>

                    <Field label="Email Address" icon={Mail} error={errors.emailAddress}>
                      <input
                        type="email"
                        name="emailAddress"
                        id="emailAddress"
                        placeholder="you@example.com"
                        value={formData.emailAddress}
                        onChange={handleChange}
                        className={ic('emailAddress', 'pyt-input pyt-input--icon')}
                        aria-invalid={!!errors.emailAddress}
                      />
                    </Field>

                    <Field label="Street Address" icon={Home}>
                      <input
                        type="text"
                        name="streetAddress"
                        id="streetAddress"
                        placeholder="Optional"
                        value={formData.streetAddress}
                        onChange={handleChange}
                        className="pyt-input pyt-input--icon"
                      />
                    </Field>

<Field label="Country of Residence" icon={Globe} error={errors.country}>
                      <input
                        type="text"
                        name="country"
                        id="country"
                        placeholder="e.g., United States"
                        value={formData.country}
                        onChange={handleChange}
                        className={ic('country', 'pyt-input pyt-input--icon')}
                        aria-invalid={!!errors.country}
                      />
                    </Field>

                  </div>

                  <div className="pyt-nav">
                    <Button type="button" variant="ghost" onClick={() => goBack(2)}>
                      <ChevronLeft size={15} /> Back
                    </Button>
                    <Button type="button" onClick={goToStep3}>
                      Next <ChevronRight size={15} />
                    </Button>
                  </div>
                </>
              )}

              {/* ── Step 3: Additional Details ── */}
              {currentStep === 3 && (
                <>
                  <p className="pyt-section-heading">Additional Details</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>

                    <Field label="How did you hear about us?" error={errors.referral}>
                      <select
                        name="referral"
                        id="referral"
                        value={formData.referral}
                        onChange={handleChange}
                        className={ic('referral', 'pyt-select pyt-select--plain')}
                        aria-invalid={!!errors.referral}
                      >
                        <option value="">Select an option</option>
                        <option value="Google Search">Google Search</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Instagram">Instagram</option>
                        <option value="YouTube">YouTube</option>
                        <option value="Friend / Family Recommendation">Friend / Family Recommendation</option>
                        <option value="Travel Agency">Travel Agency</option>
                        <option value="Previous Customer">Previous Customer</option>
                        <option value="Other">Other</option>
                      </select>
                    </Field>

                    <Field
                      label="Special Requirements"
                      hint="Dietary preferences, accommodation type, fitness level, or anything else we should know."
                    >
                      <textarea
                        name="specialRequirements"
                        id="specialRequirements"
                        rows={3}
                        value={formData.specialRequirements}
                        onChange={handleChange}
                        className="pyt-textarea"
                      />
                    </Field>

                    <Field label="Comments or Message">
                      <textarea
                        name="comments"
                        id="comments"
                        rows={4}
                        value={formData.comments}
                        onChange={handleChange}
                        className="pyt-textarea"
                      />
</Field>

                  </div>

                  <div className="pyt-nav" style={{ borderBottom: 'none' }}>
                    <Button type="button" variant="ghost" onClick={() => goBack(2)}>
                      <ChevronLeft size={15} /> Back
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending request…' : 'Submit Plan Details'}
                  </Button>
                </>
              )}

            </div>
          </form>
        </div>

        {/* ── Sidebar ───────────────────────────────────────────────────── */}
        <div className="pyt-sidebar">

          <div className="pyt-trust-card">
            <h3>Why book with us</h3>
            <div className="pyt-trust-item">
              <div className="pyt-trust-icon"><Clock3 size={16} /></div>
              <div className="pyt-trust-text">
                <strong>Reply within 24 hours</strong>
                <span>Our team responds to every inquiry, every day.</span>
              </div>
            </div>
            <div className="pyt-trust-item">
              <div className="pyt-trust-icon"><ShieldCheck size={16} /></div>
              <div className="pyt-trust-text">
                <strong>Fully customised trips</strong>
                <span>No cookie-cutter packages — built around your schedule and budget.</span>
              </div>
            </div>
            <div className="pyt-trust-item">
              <div className="pyt-trust-icon"><Star size={16} /></div>
              <div className="pyt-trust-text">
                <strong>10+ years of experience</strong>
                <span>Thousands of trekkers guided safely across Nepal.</span>
              </div>
            </div>
            <div className="pyt-rating-row">
              <div className="pyt-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <span className="pyt-rating-text">4.9 · 600+ reviews</span>
            </div>
          </div>

          <div className="pyt-trust-card" style={{ textAlign: 'center' }}>
            <h3>Prefer to chat directly?</h3>
            <a
              href="https://wa.me/9779800000000"
              target="_blank"
              rel="noopener noreferrer"
              className="pyt-whatsapp-btn"
            >
              <MessageCircle size={17} />
              Message us on WhatsApp
            </a>
            <p style={{ fontSize: '0.75rem', color: '#9b9285', marginTop: '0.625rem', lineHeight: 1.4 }}>
              Available 7 days a week · Usually replies within minutes
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}