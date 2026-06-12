"use client"

import { useState } from 'react';

import {
    Mountain,
    Compass,
    Milestone,
    GraduationCap,
    CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/Button';

export default function DmcB2bSection() {
    const [formData, setFormData] = useState({
        company: '',
        name: '',
        email: '',
        whatsapp: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle B2B inquiry form submission logic here
        console.log('B2B Inquiry Data:', formData);
    };

    return (
        <div className="bg-white text-slate-800">

            {/* 1. HERO SECTION */}
            <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-16 md:py-24 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        <span className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border">
                            Official Himalayan DMC
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
                            Your Trusted Local Travel Partner in the Himalayas
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                            Fantastic Adventure Nepal operates as a premier locally owned Destination Management Company (DMC) based in Kathmandu. We deliver professional travel management and robust ground handling services across Nepal.
                        </p>
                        <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center">
                            <Button variant="accent"
                                rounded="full"
                            >
                                <Link href="/Parner-wiht-us">Partner With Us</Link>
                            </Button>
                            <Button
                                variant="outline"
                                rounded="full"
                            >
                                <Link href="/services"> Learn More</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="lg:col-span-5">
                        <div className="relative group rounded-xl overflow-hidden shadow-xl bg-slate-200 aspect-[4/3]">
                            {/* Replace src with your realistic placeholder or local path */}
                            <img
                                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
                                alt="Fantastic Adventure Nepal B2B Team Handling Logistics in Kathmandu"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="eager"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. CORE SERVICES SHOWCASE */}
            <section id="services" className="bg-slate-50 border-y border-slate-200 py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                            Our Ground Operations & Handling Services
                        </h2>
                        <p className="mt-4 text-lg text-slate-600">
                            Reliable, flawless, end-to-end B2B infrastructure across all major regional specialties.
                        </p>
                    </div>

                    <div className="space-y-6 max-w-5xl mx-auto">
                        {/* Service 1 */}
                        <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm border-l-4 border-l-orange-600">
                            <div className="flex items-start gap-4 md:w-1/3">
                                <Mountain className="w-6 h-6 text-slate-900 shrink-0 mt-1" />
                                <h4 className="text-xl font-bold text-slate-900">Trekking & Expeditions</h4>
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Full ground coordination for Everest Base Camp, Annapurna Circuit, Langtang Valley, and Manaslu Circuit, alongside professional high-altitude peak climbing permits and gear logistics.
                                </p>
                            </div>
                        </div>

                        {/* Service 2 */}
                        <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm border-l-4 border-l-orange-600">
                            <div className="flex items-start gap-4 md:w-1/3">
                                <Compass className="w-6 h-6 text-slate-900 shrink-0 mt-1" />
                                <h4 className="text-xl font-bold text-slate-900">Cultural & Heritage Tours</h4>
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Tailored pathways focusing on ancient historical hubs like Kathmandu, Bhaktapur, and Patan Durbar Squares, Buddhist stupas, sacred monuments, and immersive local community experiences.
                                </p>
                            </div>
                        </div>

                        {/* Service 3 */}
                        <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm border-l-4 border-l-orange-600">
                            <div className="flex items-start gap-4 md:w-1/3">
                                <Milestone className="w-6 h-6 text-slate-900 shrink-0 mt-1" />
                                <h4 className="text-xl font-bold text-slate-900">Adventure & Wildlife</h4>
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    White-water river rafting, paragliding bookings in Pokhara, zip-lining, and premium deep jungle packages featuring tiger tracking and bird watching in Chitwan and Bardia National Parks.
                                </p>
                            </div>
                        </div>

                        {/* Service 4 */}
                        <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm border-l-4 border-l-orange-600">
                            <div className="flex items-start gap-4 md:w-1/3">
                                <GraduationCap className="w-6 h-6 text-slate-900 shrink-0 mt-1" />
                                <h4 className="text-xl font-bold text-slate-900">Educational & Group Travel</h4>
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Specialized logistics setups for global academic institutions, volunteer initiatives, custom corporate retreats, and complex special-interest group frameworks across South Asia.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. PARTNER WITH US & B2B FORM */}
            <section id="b2b-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                            Let's Scale the Himalayas Together
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            We establish high-integrity partnerships with global tour operators, agencies, and independent trip planners. Lean on our rock-solid legal registration and complete local footprint while you manage client-facing operations.
                        </p>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                <p className="text-slate-700 font-medium text-sm">Direct local pricing matrices with transparent cost breakdowns</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                <p className="text-slate-700 font-medium text-sm">Fast-track TIMS, national park clearances, and special inner-line permits</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                <p className="text-slate-700 font-medium text-sm">Privately managed vehicle fleets and flight reservation protocols</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                <p className="text-slate-700 font-medium text-sm">Comprehensive hotel reservation allocations across premium and mid-range chains</p>
                            </div>
                        </div>
                    </div>

                    {/* B2B INQUIRY FORM */}
                    <div className="bg-white border border-slate-200 shadow-xl rounded-xl p-8 lg:p-10">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">B2B Partnership Inquiry</h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                                    Agency / Company Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Mountain Travel Global Ltd"
                                    className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition duration-200"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                                        Contact Person
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Your Name"
                                        className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition duration-200"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                                        Work Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="partner@agency.com"
                                        className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition duration-200"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                                    WhatsApp Number / Phone
                                </label>
                                <input
                                    type="tel"
                                    required
                                    placeholder="e.g., +1 (555) 000-0000"
                                    className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition duration-200"
                                    value={formData.whatsapp}
                                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                                    Partnership Goals / Operational Needs
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Describe your expected passenger volume, regional interests, or special white-label requirements..."
                                    className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition duration-200 resize-none"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 text-sm uppercase tracking-wider"
                            >
                                Submit B2B Inquiry
                            </button>
                        </form>
                    </div>

                </div>
            </section>

        </div>
    );
}