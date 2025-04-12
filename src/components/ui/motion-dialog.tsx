import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguageStore } from '@/store/languageStore';

interface MotionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  position?: 'right' | 'left' | 'center';
  width?: 'full' | 'half' | 'third';
  showCloseButton?: boolean;
}

export const MotionDialog: React.FC<MotionDialogProps> = ({
  open,
  onOpenChange,
  children,
  title,
  className = '',
  position = 'right',
  width = 'third',
  showCloseButton = true,
}) => {
  const { direction } = useLanguageStore();
  const isRtl = direction.dir === 'rtl';

  // Adjust position based on RTL
  const effectivePosition = isRtl && position === 'right'
    ? 'left'
    : isRtl && position === 'left'
      ? 'right'
      : position;

  // Map width option to classes
  const widthClasses = {
    full: 'w-full',
    half: 'w-full md:w-1/2',
    third: 'w-full md:w-1/2 xl:w-1/3'
  };

  // Disable body scroll when dialog is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Animation variants
  const variants = {
    center: {
      hidden: { opacity: 0, scale: 0.9, y: 20 },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30
        }
      },
      exit: {
        opacity: 0,
        scale: 0.9,
        y: 20,
        transition: { duration: 0.2 }
      }
    },
    right: {
      hidden: { x: '100%', opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30
        }
      },
      exit: {
        x: '100%',
        opacity: 0,
        transition: { duration: 0.3, ease: 'easeInOut' }
      }
    },
    left: {
      hidden: { x: '-100%', opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30
        }
      },
      exit: {
        x: '-100%',
        opacity: 0,
        transition: { duration: 0.3, ease: 'easeInOut' }
      }
    }
  };

  // Positioning classes
  const positionClasses = {
    center: 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] rounded-lg',
    right: 'fixed top-0 bottom-0 right-0 h-full',
    left: 'fixed top-0 bottom-0 left-0 h-full'
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, delay: 0.1 }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => onOpenChange(false)}
            data-testid="dialog-backdrop"
          />

          {/* Dialog */}
          <motion.div
            className={`${positionClasses[effectivePosition]} ${widthClasses[width]} z-50 flex flex-col bg-background shadow-xl ${className}`}
            variants={variants[effectivePosition]}
            initial="hidden"
            animate="visible"
            exit="exit"
            data-state={open ? "open" : "closed"}
          >
            {/* Header with title if provided */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between border-b p-4 h-16">
                {title && <h2 className="text-xl font-medium">{title}</h2>}
                {showCloseButton && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onOpenChange(false)}
                    className="ml-auto"
                  >
                    <X size={24} />
                  </Button>
                )}
              </div>
            )}

            {/* Content */}
            <div className={`flex-1 ${effectivePosition === 'center' ? 'overflow-y-auto p-4' : 'overflow-y-auto'}`}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
