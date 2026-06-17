import { MessageCircle } from "lucide-react";
import { WHATSAPP_QUOTE_URL } from "@/lib/constants";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_QUOTE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="hero-reveal hero-reveal-d5 wa-float fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
