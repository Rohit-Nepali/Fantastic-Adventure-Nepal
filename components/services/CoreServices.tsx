"use client";

import { Mountain, Compass, Milestone, GraduationCap } from "lucide-react";

const ICON_MAPPING = {
  trekking: Mountain,
  cultural: Compass,
  adventure: Milestone,
  educational: GraduationCap,
};

export default function CoreServices({ t }: { t: any }) {
  return (
    <section id="services" className="bg-slate-50 border-y border-slate-200 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="service-header-animate text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.services.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600">{t.services.subtitle}</p>
        </div>

        <div id="services-list-container" className="space-y-6 max-w-5xl mx-auto">
          {t.services.items.map((service: any) => {
            const IconComponent = ICON_MAPPING[service.id as keyof typeof ICON_MAPPING] || Mountain;
            return (
              <div
                key={service.id}
                className="service-card-animate bg-white border border-slate-200 p-6 md:p-8 rounded-xl flex flex-col md:flex-row md:items-start justify-between gap-6 shadow-sm border-l-4 border-l-[#2CC1DA]"
              >
                <div className="flex items-start gap-4 md:w-1/3">
                  <div className="p-2 bg-slate-50 rounded-lg shrink-0">
                    <IconComponent className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">{service.title}</h4>
                    {service.subcap && (
                      <p className="text-xs text-[#2CC1DA] font-semibold uppercase tracking-wider mt-1">
                        {service.subcap}
                      </p>
                    )}
                  </div>
                </div>
                <div className="md:w-2/3 space-y-3">
                  <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-500">
                    {service.highlights?.map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2CC1DA]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}