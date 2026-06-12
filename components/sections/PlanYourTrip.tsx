"use client";

import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';

// Type definitions for tracking custom Toast States
interface ToastState {
  show: boolean;
  type: 'success' | 'error' | null;
  title: string;
  message: string;
}

export default function PlanYourTripSection() {
  const [formData, setFormData] = useState({
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
    comments: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dedicated Floating Alert Notification State Block
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: null,
    title: '',
    message: ''
  });

  // Automatically hide notifications after 5 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const triggerToast = (type: 'success' | 'error', title: string, message: string) => {
    setToast({
      show: true,
      type,
      title,
      message
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/plan-your-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Trigger Toast Notification on success
        triggerToast(
          'success',
          'Inquiry Submitted!',
          'Your dream itinerary requests have been successfully delivered to our specialized guides.'
        );

        // Reset the form values
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
          comments: ''
        });
      } else {
        throw new Error(data.error || 'Failed to sync form entry parameters.');
      }
    } catch (error: any) {
      // Trigger Toast Notification on failure
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

  return (
    <div className="min-h-screen py-28 px-4 sm:px-6 lg:px-8 bg-[#f0f4f8] relative">

      {/* ================= TOAST NOTIFICATION CONTAINER (TOP RIGHT) ================= */}
      <div className="fixed top-6 right-6 z-50 max-w-sm w-full pointer-events-none flex flex-col items-end gap-3">
        {toast.show && (
          <div
            className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-xl border transform transition-all duration-300 ease-out translate-x-0 animate-fade-in-left ${toast.type === 'success' ? 'border-green-200' : 'border-red-200'
              }`}
            style={{
              animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >
            <div className="p-4 relative">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {toast.type === 'success' ? (
                    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-semibold text-gray-900">{toast.title}</p>
                  <p className="mt-1 text-xs text-gray-500 font-medium leading-relaxed">{toast.message}</p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setToast((prev) => ({ ...prev, show: false }))}
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* Countdown Progress Visualizer Tracker Bar */}
            <div className="h-1 w-full bg-gray-100">
              <div
                className={`h-full transition-all duration-5000 ease-linear ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                style={{
                  animation: 'countdown 5s linear forwards'
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Embedded CSS keyframes to support custom layout transition requirements without extending config packages */}
      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes countdown {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>

      {/* ================= MAIN FORM CONTAINER COMPONENT ================= */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 border border-gray-100">

        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
            Plan Your Trip
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-xl mx-auto">
            Tell us about your dream adventure in Nepal, and our travel experts will create a personalized itinerary tailored to your interests, budget, and travel dates.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* STEP 1: Trip Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
              1. Trip Information
            </h2>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">

              <div className="sm:col-span-2">
                <label htmlFor="tripName" className="block text-sm font-medium text-gray-700">
                  Trip Name / Destination
                </label>
                <input
                  type="text"
                  name="tripName"
                  id="tripName"
                  placeholder="e.g., Everest Base Camp Trek, Annapurna Base Camp Trek"
                  value={formData.tripName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                  required
                />
              </div>

              <div>
                <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700">
                  Estimated Budget Range (USD)
                </label>
                <select
                  name="budgetRange"
                  id="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border bg-white"
                  required
                >
                  <option value="">Select a range</option>
                  <option value="Under $500">Under $500</option>
                  <option value="$500 – $1,000">$500 – $1,000</option>
                  <option value="$1,000 – $2,000">$1,000 – $2,000</option>
                  <option value="$2,000 – $5,000">$2,000 – $5,000</option>
                  <option value="Above $5000">Above $5,000</option>
                </select>
              </div>

              <div>
                <label htmlFor="numberOfTravelers" className="block text-sm font-medium text-gray-700">
                  Number of Travelers
                </label>
                <select
                  name="numberOfTravelers"
                  id="numberOfTravelers"
                  value={formData.numberOfTravelers}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border bg-white"
                  required
                >
                  <option value="">Select no.of travelers</option>
                  <option value="Solo Traveler">Solo Traveler</option>
                  <option value="2 People">2 People</option>
                  <option value="3–5 People">3–5 People</option>
                  <option value="6–10 People">6–10 People</option>
                  <option value="10+ People">10+ People</option>
                </select>
              </div>

              <div>
                <label htmlFor="travelDate" className="block text-sm font-medium text-gray-700">
                  Preferred Travel Date
                </label>
                <input
                  type="date"
                  name="travelDate"
                  id="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                  required
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                  Trip Duration (Days)
                </label>
                <input
                  type="number"
                  name="duration"
                  id="duration"
                  min="1"
                  placeholder="e.g., 14"
                  value={formData.duration}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                  required
                />
              </div>

            </div>
          </div>

          {/* STEP 2: Personal Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
              2. Personal Information
            </h2>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">

              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                  required
                />
              </div>

              <div>
                <label htmlFor="whatsAppNumber" className="block text-sm font-medium text-gray-700">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  name="whatsAppNumber"
                  id="whatsAppNumber"
                  placeholder="+1 234 567 890"
                  value={formData.whatsAppNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                  required
                />
              </div>

              <div>
                <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  id="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                  required
                />
              </div>

              <div>
                <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
                  Street Address
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  id="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country of Residence
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                  required
                />
              </div>

            </div>
          </div>

          {/* STEP 3: Additional Details */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
              3. Additional Details
            </h2>
            <div className="space-y-6">

              <div>
                <label htmlFor="referral" className="block text-sm font-medium text-gray-700">
                  How Did You Hear About Us?
                </label>
                <select
                  name="referral"
                  id="referral"
                  value={formData.referral}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border bg-white"
                  required
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
              </div>

              <div>
                <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700">
                  Special Requirements
                </label>
                <p className="text-xs text-gray-500 mb-1">
                  Please mention dietary preferences, accommodation preferences, fitness level, travel interests, or any special requests.
                </p>
                <textarea
                  name="specialRequirements"
                  id="specialRequirements"
                  rows={3}
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                />
              </div>

              <div>
                <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
                  Comments or Message
                </label>
                <textarea
                  name="comments"
                  id="comments"
                  rows={4}
                  value={formData.comments}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                />
              </div>

            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              variant="accent"
              type="submit"
              disabled={isSubmitting}
              className='w-full justify-center'
            >
              {isSubmitting ? 'Sending Request...' : 'Submit Plan Details'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}