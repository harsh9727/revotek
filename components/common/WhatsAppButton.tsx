import Link from "next/link";
import { WhatsappFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const WhatsAppButton = () => (
  <Link
    href="https://wa.me/919265999898"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with Revotek Elevators on WhatsApp"
    className="fixed bottom-20 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
  >
    <span
      aria-hidden="true"
      className="absolute inset-0 rounded-full bg-green-500 motion-safe:animate-ping motion-reduce:animate-none"
    />
    <HugeiconsIcon
      icon={WhatsappFreeIcons}
      size={24}
      aria-hidden="true"
      className="relative"
    />
  </Link>
);
