import React from 'react';
import { motion } from 'framer-motion';

/**
 * Letter-by-letter ink-bleeding text component
 */
export function PenText({
  text = '',
  className = '',
  delay = 0,
  stagger = 0.025,
  as: Component = 'span',
}) {
  // Flatten characters with a global index while grouping by words to prevent mid-word line breaks
  const words = text.split(' ');
  let charCounter = 0;

  return (
    <Component className={`inline-block ${className}`}>
      <span className="inline">
        {words.map((word, wIdx) => {
          const wordChars = Array.from(word);
          return (
            <React.Fragment key={wIdx}>
              <span className="inline-block whitespace-nowrap">
                {wordChars.map((char) => {
                  const currentIndex = charCounter++;
                  return (
                    <motion.span
                      key={currentIndex}
                      initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{
                        duration: 0.45,
                        delay: delay + currentIndex * stagger,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
              {wIdx < words.length - 1 && (
                <span className="inline-block whitespace-pre"> </span>
              )}
            </React.Fragment>
          );
        })}
      </span>
    </Component>
  );
}
