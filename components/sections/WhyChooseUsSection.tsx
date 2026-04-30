"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
	Compass,
	HandHeart,
	Headphones,
	MapPinned,
	ShieldCheck,
	Wallet,
} from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/provider/Language";

const featureIcons = [
	MapPinned,
	ShieldCheck,
	Compass,
	HandHeart,
	Wallet,
	Headphones,
];

export default function WhyChooseUsSection() {
	const { language } = useLanguage();
	const copy = translations[language].whyChooseUs;
	const sectionRef = useRef<HTMLElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
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
						trigger: cardsRef.current,
						start: "top 88%",
					},
				}
			);

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

	return (
		<SectionWrapper
			id="why-choose-us"
			ref={sectionRef}
			size="default"
			padding="default"
			bg="light"
			className="border-y border-black/5"
		>
			<div className="mx-auto max-w-7xl">
				<div
					ref={headerRef}
					className="mb-12 grid grid-cols-1 gap-8 border-b border-black/10 pb-10 md:mb-14 md:grid-cols-12"
				>
					<div className="md:col-span-7">
						<p className="mb-4 text-[11px] font-light uppercase tracking-[0.28em] text-black/40">
							{copy.label || "Why Choose Us"}
						</p>

						<h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-black md:text-5xl lg:text-6xl">
							{copy.titleLead || "Your Adventure"}
							<span className="block font-light italic text-black/50">
								{copy.titleAccent || "Starts Here"}
							</span>
						</h2>
					</div>

					<div className="md:col-span-5 md:pl-8 md:pt-1">
						<p className="max-w-md text-[14px] leading-relaxed text-black/55 md:text-[15px]">
							{copy.description ||
								"We go above and beyond to ensure your Nepal experience exceeds all expectations."}
						</p>
						<div className="why-choose-line mt-5 h-px w-24 bg-accent/50" />
					</div>
				</div>

				<div
					ref={cardsRef}
					className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
				>
					{(copy.features || []).map((feature, index) => {
						const Icon = featureIcons[index % featureIcons.length];

						return (
							<article
								key={`${feature.number}-${feature.title}`}
								className="why-choose-card group rounded-2xl border border-black/10 bg-white/80 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_14px_26px_-22px_rgba(2,6,23,0.6)]"
							>
								<div className="mb-4 flex items-center justify-between">
									<span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 text-black/65 transition-colors duration-300 group-hover:text-accent">
										<Icon size={18} strokeWidth={1.8} />
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
						);
					})}
				</div>
			</div>
		</SectionWrapper>
	);
}
