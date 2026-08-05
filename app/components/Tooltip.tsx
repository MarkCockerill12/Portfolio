import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content, delay = 700 }) => {
  const [show, setShow] = useState(false);
  // A local `let` was reset on every render, so the pending timer often
  // survived mouse-leave and popped the tooltip open over nothing.
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => () => {
    if (timeout.current) clearTimeout(timeout.current);
  }, []);

  const handleMouseEnter = () => {
    timeout.current = setTimeout(() => setShow(true), delay);
  };
  const handleMouseLeave = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setShow(false);
  };

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {show && (
        <span style={{
          position: 'absolute',
          left: '50%',
          top: '120%',
          transform: 'translateX(-50%)',
          background: 'rgba(30,41,59,0.97)',
          color: 'white',
          padding: '6px 14px',
          borderRadius: 8,
          fontSize: 13,
          whiteSpace: 'nowrap',
          zIndex: 10000,
          boxShadow: '0 4px 16px 0 rgba(0,0,0,0.18)'
        }}>
          {content}
        </span>
      )}
    </span>
  );
};

export default Tooltip;
