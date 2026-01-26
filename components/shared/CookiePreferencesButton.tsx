"use client";

type CookiePreferencesButtonProps = {
  children: string;
  className?: string;
};

export function CookiePreferencesButton({
  children,
  className,
}: CookiePreferencesButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new Event("open-cookie-preferences"));
      }}
      className={className}
    >
      {children}
    </button>
  );
}

