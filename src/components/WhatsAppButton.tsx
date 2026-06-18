import { MessageCircle } from "lucide-react";
import { WHATSAPP_QUOTE_URL } from "@/lib/constants";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_QUOTE_URL}
      rel="noopener noreferrer"
      className="wa-float fixed right-4 z-[100] flex h-14 w-14 touch-manipulation items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))]"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
