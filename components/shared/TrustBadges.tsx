import Image from "next/image";
import { siteConfig } from "@/config/site.config";

export function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-900">
      {siteConfig.proof.accreditations.map((item) => (
        <div
          key={item.name}
          className="flex min-h-10 items-center rounded-full border border-(--color-secondary)/25 bg-white/95 px-4 py-2 text-slate-900 shadow-sm backdrop-blur"
        >
          {item.logo ? (
            <Image
              src={item.logo}
              alt={item.name}
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
            />
          ) : (
            <span>{item.name}</span>
          )}
        </div>
      ))}
      <div className="rounded-full border border-(--color-secondary)/25 bg-white/95 px-3 py-1 text-slate-900 shadow-sm backdrop-blur">
        {siteConfig.proof.insurance}
      </div>
      <div className="rounded-full border border-(--color-secondary)/25 bg-white/95 px-3 py-1 text-slate-900 shadow-sm backdrop-blur">
        {siteConfig.proof.guarantee}
      </div>
    </div>
  );
}
