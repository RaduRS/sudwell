"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";

type TooltipBadgeProps = {
  tooltip: string;
  className?: string;
  children: ReactNode;
};

export function TooltipBadge({
  tooltip,
  className,
  children,
}: TooltipBadgeProps) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen((current) => !current)}
      onBlur={() => setOpen(false)}
      className={[
        "group relative flex min-h-10 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
      <div
        className={`pointer-events-none absolute left-1/2 top-full z-30 mt-2 w-max max-w-[min(320px,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-(--color-foreground)/10 bg-white/95 px-3 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-black/10 backdrop-blur transition ${
          open ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {tooltip}
      </div>
    </button>
  );
}

export function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-900">
      {siteConfig.proof.accreditations.map((item) => (
        <TooltipBadge key={item.name} tooltip={item.name}>
          {item.logo ? (
            <Image
              src={item.logo}
              alt={item.name}
              width={200}
              height={64}
              className="h-16 w-auto object-contain"
            />
          ) : (
            <div className="flex min-h-10 items-center rounded-full border border-(--color-secondary)/25 bg-white/95 px-4 py-2 text-slate-900 shadow-sm backdrop-blur">
              <span>{item.name}</span>
            </div>
          )}
        </TooltipBadge>
      ))}
      <TooltipBadge tooltip={siteConfig.proof.insurance}>
        {siteConfig.proof.insuranceLogo ? (
          <Image
            src={siteConfig.proof.insuranceLogo}
            alt={siteConfig.proof.insurance}
            width={220}
            height={70}
            className="h-16 w-auto object-contain"
          />
        ) : (
          <div className="rounded-full border border-(--color-secondary)/25 bg-white/95 px-3 py-1 text-slate-900 shadow-sm backdrop-blur">
            {siteConfig.proof.insurance}
          </div>
        )}
      </TooltipBadge>
      <TooltipBadge tooltip={siteConfig.proof.guarantee}>
        {siteConfig.proof.guaranteeLogo ? (
          <Image
            src={siteConfig.proof.guaranteeLogo}
            alt={siteConfig.proof.guarantee}
            width={220}
            height={70}
            className="h-16 w-auto object-contain"
          />
        ) : (
          <div className="rounded-full border border-(--color-secondary)/25 bg-white/95 px-3 py-1 text-slate-900 shadow-sm backdrop-blur">
            {siteConfig.proof.guarantee}
          </div>
        )}
      </TooltipBadge>
    </div>
  );
}
