"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as Icons from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";

interface FeatureItem {
	number: string;
	title: string;
	description: string;
	iconName?: string; // Stored in Sanity as "MapPinned", "ShieldCheck", etc.
}

export interface WhyChooseUsProps {
	data: {
		label: string;
		titleLead: string;
		titleAccent: string;
		description: string;
		features: FeatureItem[];
	};
}

export default function WhyChooseUsSection({ data }: WhyChooseUsProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	const cardsContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			// Header animation
			gsap.fromTo(
				headerRef.current,
				{ opacity: 0, y: 24 },
				{
					opacity: 1,
					y: 0,
					duration: 0.75,
					ease: "power2.out",
					scrollTrigger: {
						trigger: headerRef.current,
						start: "top 88%",
					},
				}
			);

			// Stagger all feature cards seamlessly across both rows
			gsap.fromTo(
				".why-choose-card",
				{ opacity: 0, y: 20 },
				{
					opacity: 1,
					y: 0,
					duration: 0.55,
					stagger: 0.08,
					ease: "power2.out",
					scrollTrigger: {
						trigger: cardsContainerRef.current,
						start: "top 88%",
					},
				}
			);

			// Animated divider line
			gsap.fromTo(
				".why-choose-line",
				{ scaleX: 0, transformOrigin: "left center" },
				{
					scaleX: 1,
					duration: 0.7,
					ease: "power2.out",
					scrollTrigger: {
						trigger: headerRef.current,
						start: "top 86%",
					},
				}
			);
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	const features = data?.features || [];
	const topRowFeatures = features.slice(0, 2);
	const bottomRowFeatures = features.slice(2);

	// Helper to dynamically render Lucide icons passed from Sanity strings
	const renderIcon = (iconName?: string) => {
		const DynamicIcon = (Icons[iconName as keyof typeof Icons] || Icons.Compass) as React.ComponentType<{ size: number; strokeWidth: number }>;
		return <DynamicIcon size={18} strokeWidth={1.8} />;
	};

	return (
		<SectionWrapper
			id="why-choose-us"
			ref={sectionRef}
			size="default"
			padding="default"
			bg="light"
			className="border-y border-black/5"
		>
			<div className="mx-auto max-w-7xl md:py-6 px-6 md:px-10">
				{/* Section Header */}
				<div
					ref={headerRef}
					className="mb-12 grid grid-cols-1 gap-8 md:mb-14 md:grid-cols-12"
				>
					<div className="md:col-span-7">
						<p className="mb-4 text-[11px] font-light uppercase tracking-[0.28em] text-black/40">
							{data?.label || "Why Choose Us"}
						</p>

						<h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-black md:text-5xl lg:text-6xl">
							{data?.titleLead || "Your Adventure"}
							<span className="block font-light italic text-black/50">
								{data?.titleAccent || "Starts Here"}
							</span>
						</h2>
					</div>

					<div className="md:col-span-5 md:pl-8 md:pt-1">
						<p className="max-w-md text-[14px] leading-relaxed text-black/55 md:text-[15px]">
							{data?.description || "We go above and beyond to ensure your Nepal experience exceeds all expectations."}
						</p>
						{/* <div className="why-choose-line mt-5 h-px w-24 bg-accent/50" /> */}
					</div>
				</div>

				{/* Cards Container */}
				<div ref={cardsContainerRef} className="space-y-4">
					{/* Top Row: 2 Column Layout */}
					{topRowFeatures.length > 0 && (
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							{topRowFeatures.map((feature) => (
								<article
									key={`${feature.number}-${feature.title}`}
									className="why-choose-card group rounded-2xl border border-black/10 bg-white/80 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_14px_26px_-22px_rgba(2,6,23,0.6)]"
								>
									<div className="mb-4 flex items-center justify-between">
										<span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 text-black/65 transition-colors duration-300 group-hover:text-accent">
											{renderIcon(feature.iconName)}
										</span>
										<span className="text-[10px] font-light uppercase tracking-[0.22em] text-black/35">
											{feature.number}
										</span>
									</div>

									<h3 className="text-xl font-semibold leading-tight tracking-tight text-black">
										{feature.title}
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-black/55">
										{feature.description}
									</p>
									<div className="mt-4 h-px w-10 bg-black/20 transition-all duration-300 group-hover:w-16 group-hover:bg-accent/60" />
								</article>
							))}
						</div>
					)}

					{/* Bottom Row: 4 Column Layout */}
					{bottomRowFeatures.length > 0 && (
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
							{bottomRowFeatures.map((feature) => (
								<article
									key={`${feature.number}-${feature.title}`}
									className="why-choose-card group rounded-2xl border border-black/10 bg-white/80 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_14px_26px_-22px_rgba(2,6,23,0.6)]"
								>
									<div className="mb-4 flex items-center justify-between">
										<span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 text-black/65 transition-colors duration-300 group-hover:text-accent">
											{renderIcon(feature.iconName)}
										</span>
										<span className="text-[10px] font-light uppercase tracking-[0.22em] text-black/35">
											{feature.number}
										</span>
									</div>

									<h3 className="text-lg font-semibold leading-tight tracking-tight text-black">
										{feature.title}
									</h3>
									<p className="mt-2 text-xs leading-relaxed text-black/55">
										{feature.description}
									</p>
									<div className="mt-4 h-px w-10 bg-black/20 transition-all duration-300 group-hover:w-16 group-hover:bg-accent/60" />
								</article>
							))}
						</div>
					)}
				</div>
			</div>
		</SectionWrapper>
	);
}