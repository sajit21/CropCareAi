import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text = '', speed = 50 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentText('');
    setCurrentIndex(0);

    if (!text) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        setCurrentText(text.slice(0, nextIndex));

        if (nextIndex >= text.length) {
          clearInterval(interval);
        }

        return nextIndex;
      });
    }, speed);

    return () => clearInterval(interval); 
  }, [text, speed]);

  return (
    <span className={`${text.startsWith('Uploaded')?'text-red-400':''} font-bold`}>
      {currentText}
      {currentIndex < text.length && <span className="blinking-cursor">|</span>}
    </span>
  );
};

export default TypingEffect;
