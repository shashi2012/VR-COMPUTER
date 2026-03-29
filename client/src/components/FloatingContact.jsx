
import { motion ,AnimatePresence} from "motion/react"

/**
 * FloatingContact Component
 * Renders animated WhatsApp and Email icons in the bottom right corner.
 * Includes a subtle floating idle animation.
 */
const FloatingContact = () => {
  const actions = [
    { 
      icon: "✉️", 
      color: "bg-blue-500", 
      label: "Email", 
      href: "mailto:support@quickfixlabs.com" 
    },
    { 
      icon: "💬", 
      color: "bg-green-500", 
      label: "WhatsApp", 
      href: "https://wa.me/7947115892" // Replace with your actual business number
    },
  ];

  // Animation variant for the continuous floating effect
  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-9999">
      <AnimatePresence>
        {actions.map((action, i) => (
          <motion.div
            key={i}
            variants={floatVariants}
            initial="initial"
            animate="animate"
            // Adding a slight delay to the floating loop so they don't move in perfect sync
            style={{ animationDelay: `${i * 0.5}s` }}
          >
            <motion.a
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20, 
                delay: i * 0.1 
              }}
              whileHover={{ 
                scale: 1.15, 
                rotate: 8,
                filter: "brightness(1.1)"
              }}
              whileTap={{ scale: 0.9 }}
              className={`${action.color} w-14 h-14 rounded-full flex items-center justify-center text-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] cursor-pointer text-2xl transition-shadow hover:shadow-2xl group relative`}
              title={action.label}
            >
              {/* Tooltip that appears on hover */}
              <span className="absolute right-16 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {action.label}
              </span>
              
              {action.icon}
            </motion.a>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingContact;