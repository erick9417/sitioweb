"use client";

import { motion } from "framer-motion";

export default function WhatsAppFloat() {
  const phone = "50663819141";
  const text = encodeURIComponent("Hola, necesito más información sobre las plantillas Lucván.");
  const href = `https://wa.me/${phone}?text=${text}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="hidden lg:flex fixed bottom-5 right-5 z-50 items-center gap-3 rounded-full btn-primary shadow-xl px-5 py-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
        <path d="M20.52 3.48A11.86 11.86 0 0012.06 0C5.6 0 .34 5.25.34 11.72c0 2.06.53 4.07 1.55 5.85L0 24l6.62-1.73a11.67 11.67 0 005.44 1.4h.01c6.46 0 11.72-5.26 11.72-11.72a11.61 11.61 0 00-3.27-8.47zM12.06 21.3h-.01a9.6 9.6 0 01-4.9-1.34l-.35-.2-3.93 1.03 1.05-3.83-.23-.39a9.56 9.56 0 01-1.46-5.15c0-5.29 4.3-9.59 9.59-9.59 2.56 0 4.97 1 6.78 2.8a9.53 9.53 0 012.82 6.78c0 5.29-4.3 9.59-9.59 9.59zm5.27-7.17c-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.15-.65.14-.19.29-.75.93-.92 1.12-.17.2-.34.22-.63.08-.29-.15-1.21-.45-2.31-1.44-.85-.76-1.42-1.7-1.59-1.98-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.2.05-.37-.02-.52-.08-.15-.65-1.57-.89-2.15-.23-.55-.47-.47-.65-.48-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.29.29-1.1 1.07-1.1 2.61 0 1.54 1.12 3.03 1.28 3.24.15.2 2.2 3.35 5.32 4.7.74.32 1.31.51 1.76.65.74.24 1.41.21 1.94.13.59-.09 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34z" />
      </svg>
      <span className="hidden sm:block font-semibold">WhatsApp</span>
    </motion.a>
  );
}
