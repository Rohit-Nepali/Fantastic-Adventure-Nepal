    "use client"

    import { useState, useEffect, useRef } from 'react';
    import { gsap } from 'gsap';
    import {
        Mountain,
        Compass,
        Milestone,
        GraduationCap,
        CheckCircle2,
    } from 'lucide-react';
    import Link from 'next/link';
    import { Button } from '../ui/Button';

    interface ToastState {
        show: boolean;
        type: "success" | "error" | null;
        title: string;
        message: string;
    }

    const HERO_CONTENT = {
        badge: "Official Himalayan DMC",
        title: "Your Trusted Local Travel Partner in the Himalayas",
        description: "Fantastic Adventure Nepal operates as a premier locally owned Destination Management Company (DMC) based in Kathmandu. We deliver professional travel management and robust ground handling services across Nepal.",
        imageSrc: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Fantastic Adventure Nepal B2B Team Handling Logistics in Kathmandu"
    };

    const SERVICES_DATA = {
        title: "Our Ground Operations & Handling Services",
        subtitle: "Reliable, flawless, end-to-end B2B infrastructure across all major regional specialties.",
        items: [
            {
                id: "trekking",
                icon: Mountain,
                title: "Trekking & Expeditions",
                description: "Full ground coordination for Everest Base Camp, Annapurna Circuit, Langtang Valley, and Manaslu Circuit, alongside professional high-altitude peak climbing permits and gear logistics."
            },
            {
                id: "cultural",
                icon: Compass,
                title: "Cultural & Heritage Tours",
                description: "Tailored pathways focusing on ancient historical hubs like Kathmandu, Bhaktapur, and Patan Durbar Squares, Buddhist stupas, sacred monuments, and immersive local community experiences."
            },
            {
                id: "adventure",
                icon: Milestone,
                title: "Adventure & Wildlife",
                description: "White-water river rafting, paragliding bookings in Pokhara, zip-lining, and premium deep jungle packages featuring tiger tracking and bird watching in Chitwan and Bardia National Parks."
            },
            {
                id: "educational",
                icon: GraduationCap,
                title: "Educational & Group Travel",
                description: "Specialized logistics setups for global academic institutions, volunteer initiatives, custom corporate retreats, and complex special-interest group frameworks across South Asia."
            }
        ]
    };

    const BENEFITS_DATA = {
        title: "Let's Scale the Himalayas Together",
        description: "We establish high-integrity partnerships with global tour operators, agencies, and independent trip planners. Lean on our rock-solid legal registration and complete local footprint while you manage client-facing operations.",
        list: [
            "Direct local pricing matrices with transparent cost breakdowns",
            "Fast-track TIMS, national park clearances, and special inner-line permits",
            "Privately managed vehicle fleets and flight reservation protocols",
            "Comprehensive hotel reservation allocations across premium and mid-range chains"
        ]
    };


    export default function DmcB2bSection() {
        const containerRef = useRef<HTMLDivElement>(null);

        const [formData, setFormData] = useState({
            company: '',
            name: '',
            email: '',
            whatsapp: '',
            message: ''
        });

        const [isSubmitting, setIsSubmitting] = useState(false);
        const [toast, setToast] = useState<ToastState>({
            show: false,
            type: null,
            title: '',
            message: ''
        });

        useEffect(() => {
            if (!toast.show) return;

            const timer = setTimeout(() => {
                setToast((prev) => ({ ...prev, show: false }));
            }, 5000);

            return () => clearTimeout(timer);
        }, [toast.show]);

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
                const response = await fetch('/api/partner-with-us', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(data.message || data.error || 'Failed to submit inquiry.');
                }

                triggerToast(
                    'success',
                    'Inquiry Sent',
                    'Your B2B partnership request has been submitted successfully.'
                );

                setFormData({
                    company: '',
                    name: '',
                    email: '',
                    whatsapp: '',
                    message: ''
                });
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'We could not submit your inquiry. Please try again.';
                triggerToast(
                    'error',
                    'Submission Failed',
                    errorMessage
                );
                console.error('Error submitting B2B inquiry:', error);
            } finally {
                setIsSubmitting(false);
            }
        };

        // GSAP ScrollTrigger Animations
        useEffect(() => {
            const ctx = gsap.context(() => {

                // 1. Hero Section Animations
                gsap.from(".hero-animate", {
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out"
                });

                gsap.from(".hero-img-animate", {
                    scale: 0.95,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power2.out",
                    delay: 0.4
                });

                // 2. Services Section Animations
                gsap.from(".service-header-animate", {
                    scrollTrigger: {
                        trigger: ".service-header-animate",
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out"
                });

                gsap.from(".service-card-animate", {
                    scrollTrigger: {
                        trigger: "#services-list-container",
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out"
                });

                // 3. Form Section Animations
                gsap.from(".form-info-animate", {
                    scrollTrigger: {
                        trigger: "#b2b-form",
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    x: -40,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power2.out"
                });

                gsap.from(".form-card-animate", {
                    scrollTrigger: {
                        trigger: "#b2b-form",
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    x: 40,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power2.out"
                });

            }, containerRef);

            return () => ctx.revert(); // Cleanup GSAP on unmount
        }, []);

        return (
            <div ref={containerRef} className="bg-white text-slate-800 overflow-hidden">
                <div
                    className="fixed top-6 right-6 z-50 w-full max-w-sm pointer-events-auto"
                    role="status"
                    aria-live="polite"
                >
                    {toast.show && (
                        <div className="overflow-hidden rounded-xl bg-white shadow-2xl border border-slate-200">
                            <div className="flex items-start gap-3 p-4">
                                <div className="shrink-0 mt-0.5">
                                    {toast.type === 'success' ? (
                                        <CheckCircle2 className="h-5 w-5 text-[#2CC1DA]" />
                                    ) : (
                                        <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-900">{toast.title}</p>
                                    <p className="mt-1 text-xs leading-relaxed text-slate-600">{toast.message}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setToast((prev) => ({ ...prev, show: false }))}
                                    className="shrink-0 rounded-md text-slate-400 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2CC1DA]/30"
                                    aria-label="Dismiss notification"
                                >
                                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <div className="h-1 bg-slate-100">
                                <div
                                    className={`h-full ${toast.type === 'success' ? 'bg-[#2CC1DA]' : 'bg-red-500'}`}
                                    style={{
                                        animation: 'b2bToastCountdown 5s linear forwards'
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* 1. HERO SECTION */}
                <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-16 md:py-24 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 space-y-6">
                            <span className="hero-animate inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border">
                                {HERO_CONTENT.badge}
                            </span>
                            <h1 className="hero-animate text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
                                {HERO_CONTENT.title}
                            </h1>
                            <p className="hero-animate text-lg text-slate-600 leading-relaxed max-w-2xl">
                                {HERO_CONTENT.description}
                            </p>
                            <div className="hero-animate pt-4 flex flex-col sm:flex-row gap-4 items-center">
                                <Button variant="accent" rounded="full">
                                    <Link href="/Parner-wiht-us">Partner With Us</Link>
                                </Button>
                                <Button variant="outline" rounded="full">
                                    <Link href="/services"> Learn More</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="lg:col-span-5 hero-img-animate">
                            <div className="relative group rounded-xl overflow-hidden shadow-xl bg-slate-200 aspect-[4/3]">
                                <img
                                    src={HERO_CONTENT.imageSrc}
                                    alt={HERO_CONTENT.imageAlt}
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
                        <div className="service-header-animate text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                                {SERVICES_DATA.title}
                            </h2>
                            <p className="mt-4 text-lg text-slate-600">
                                {SERVICES_DATA.subtitle}
                            </p>
                        </div>

                        <div id="services-list-container" className="space-y-6 max-w-5xl mx-auto">
                            {SERVICES_DATA.items.map((service) => {
                                const IconComponent = service.icon;
                                return (
                                    <div
                                        key={service.id}
                                        className="service-card-animate bg-white border border-slate-200 p-6 md:p-8 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm border-l-4 border-l-[#2CC1DA]"
                                    >
                                        <div className="flex items-start gap-4 md:w-1/3">
                                            <IconComponent className="w-6 h-6 text-slate-900 shrink-0 mt-1" />
                                            <h4 className="text-xl font-bold text-slate-900">{service.title}</h4>
                                        </div>
                                        <div className="md:w-2/3">
                                            <p className="text-slate-600 text-sm leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* 3. PARTNER WITH US & B2B FORM */}
                <section id="b2b-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                        <div className="form-info-animate space-y-6">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                                {BENEFITS_DATA.title}
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                {BENEFITS_DATA.description}
                            </p>

                            <div className="space-y-4 pt-4">
                                {BENEFITS_DATA.list.map((benefit, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#2CC1DA] shrink-0 mt-0.5" />
                                        <p className="text-slate-700 font-medium text-sm">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* B2B INQUIRY FORM */}
                        <div className="form-card-animate bg-white border border-slate-200 shadow-xl rounded-xl p-8 lg:p-10">
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
                                        className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2CC1DA] focus:ring-2 focus:ring-[#2CC1DA]/10 transition duration-200"
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
                                            className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2CC1DA] focus:ring-2 focus:ring-[#2CC1DA]/10 transition duration-200"
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
                                            className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2CC1DA] focus:ring-2 focus:ring-[#2CC1DA]/10 transition duration-200"
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
                                        className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2CC1DA] focus:ring-2 focus:ring-[#2CC1DA]/10 transition duration-200"
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
                                        className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2CC1DA] focus:ring-2 focus:ring-[#2CC1DA]/10 transition duration-200 resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    variant="accent"
                                    width="full"
                                    loading={isSubmitting}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending B2B Inquiry...' : 'Submit B2B Inquiry'}
                                </Button>
                            </form>
                        </div>

                    </div>
                </section>

                <style jsx global>{`
                    @keyframes b2bToastCountdown {
                        from { width: 100%; }
                        to { width: 0%; }
                    }
                `}</style>
            </div>
        );
    }
