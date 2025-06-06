import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import usePathname from './usePathname'
import Crosshair from '../../lib/Crosshair'
import confetti from 'canvas-confetti'

interface LittleGuyProps {
  visible: boolean
  onClose: () => void
}

const chatBoxBg = {
  light: 'bg-white border-gray-300',
  dark: 'bg-gray-900 border-gray-700',
}

const LittleGuy: React.FC<LittleGuyProps> = ({ visible, onClose }) => {
  const { resolvedTheme } = useTheme()
  const [showBubble, setShowBubble] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState<{ from: 'user' | 'guy', text: string, key?: string }[]>([])
  const [guyPos, setGuyPos] = useState<{ top: number; left: number } | null>(null)
  const [dragging, setDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState<{x: number, y: number}>({x: 0, y: 0})
  const [shootMode, setShootMode] = useState(false)
  const guyRef = useRef<HTMLDivElement>(null)
  const chatBoxRef = useRef<HTMLDivElement>(null)
  const shootTimeout = useRef<NodeJS.Timeout | null>(null);
  const animatingShoot = useRef(false);
  const pathname = usePathname();

  // Track hi count for 'say hi' option
  const [hiCount, setHiCount] = useState(0);

  useEffect(() => {
    if (visible && typeof window !== 'undefined') {
      setGuyPos({
        top: 120, // move him further down from the header
        left: 48,
      });
    }
  }, [visible]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setGuyPos({
        top: 120,
        left: 48,
      });
    }
  }, [pathname]);

  useEffect(() => {
    if (visible) {
      setShowBubble(true)
      setTimeout(() => setShowBubble(false), 1000)
    } else {
      setChatOpen(false)
      setShootMode(false)
      setHiCount(0)
      setMessages([])
    }
  }, [visible])

  useEffect(() => {
    // Reset chat only on page change
    setChatOpen(false)
    setShootMode(false)
    setHiCount(0)
    setMessages([])
  }, [pathname])

  const getUniqueKey = () => {
    const key = `${Date.now()}-${Math.random()}`
    return key
  }

  const handleGuyClick = (e?: React.MouseEvent) => {
    if (shootMode) {
      setShootMode(false);
      setChatOpen(true);
      setMessages((msgs) => [...msgs, { from: 'guy', text: 'You got me!', key: getUniqueKey() }]);
      // Fire confetti stars from the guy's position
      if (guyRef.current) {
        const rect = guyRef.current.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { x, y },
          shapes: ['star'],
          colors: ['#FFD700', '#FF69B4', '#60A5FA', '#34D399', '#F87171'],
          scalar: 1.2,
        });
      }
      return;
    }
    if (chatOpen) {
      setChatOpen(false);
      return;
    }
    setChatOpen(true)
    // Only show welcome message if there are no previous messages
    setMessages((msgs) =>
      msgs.length === 0
        ? [
            { from: 'guy', text: "Hello! I'm the little helper, if you have any questions just ask me, you can drag me around too!", key: getUniqueKey() },
            { from: 'guy', text: 'What would you like to do?', key: getUniqueKey() }
          ]
        : msgs
    )
  }

  // --- Drag and drop handlers (with 'woah hey' message only on drag start) ---
  const dragMoved = useRef(false);

  const handleDragStart = (e: React.MouseEvent) => {
    setDragging(true);
    setDragOffset({
      x: e.clientX - (guyPos?.left ?? 0),
      y: e.clientY - (guyPos?.top ?? 0),
    });
    dragMoved.current = false; // Reset for this drag
    e.preventDefault();
  }
  const handleDrag = (e: MouseEvent) => {
    if (!dragging) return;
    const docW = document.documentElement.scrollWidth;
    const docH = document.documentElement.scrollHeight;
    const guyWidth = 80, guyHeight = 120;
    const newLeft = Math.max(0, Math.min(docW - guyWidth, e.clientX - dragOffset.x));
    const newTop = Math.max(0, Math.min(docH - guyHeight, e.clientY - dragOffset.y));
    // Only say 'woah hey where we goin' on the first actual move
    if (!dragMoved.current && (newLeft !== (guyPos?.left ?? 0) || newTop !== (guyPos?.top ?? 0))) {
      dragMoved.current = true;
      if (chatOpen) {
        setMessages((msgs) => {
          if (msgs.length === 0 || msgs[msgs.length - 1].text !== 'Woah hey where we goin') {
            return [...msgs, { from: 'guy', text: 'Woah hey where we goin', key: getUniqueKey() }];
          }
          return msgs;
        });
      }
    }
    setGuyPos({ left: newLeft, top: newTop });
  }
  const handleDragEnd = () => {
    setDragging(false);
  }
  useEffect(() => {
    if (!dragging) return;
    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', handleDragEnd);
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
    };
  }, [dragging, dragOffset])

  // --- Shoot mode: animate guy smoothly within viewport, a bit faster ---
  useEffect(() => {
    if (!shootMode) return;
    const moveGuy = (e: MouseEvent) => {
      if (!guyRef.current || animatingShoot.current) return;
      const guyRect = guyRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const dist = Math.hypot(mouseX - (guyRect.left + guyRect.width/2), mouseY - (guyRect.top + guyRect.height/2));
      if (dist < 120 && !shootTimeout.current) {
        // Restrict movement to current viewport (not page)
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const guyWidth = 80, guyHeight = 120;
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        const minLeft = scrollX;
        const maxLeft = scrollX + winW - guyWidth;
        const minTop = scrollY;
        const maxTop = scrollY + winH - guyHeight;
        // Pick a random spot within the viewport, but not too close to the mouse
        let newLeft, newTop, tries = 0;
        do {
          newLeft = Math.random() * (maxLeft - minLeft) + minLeft;
          newTop = Math.random() * (maxTop - minTop) + minTop;
          tries++;
        } while (tries < 10 && Math.hypot(newLeft + guyWidth/2 - mouseX - scrollX, newTop + guyHeight/2 - mouseY - scrollY) < 100);
        animatingShoot.current = true;
        // Animate smoothly from current to new position, a bit faster
        const steps = 40; // faster than before
        let step = 0;
        const startLeft = guyPos?.left ?? minLeft;
        const startTop = guyPos?.top ?? minTop;
        const dx = (newLeft - startLeft) / steps;
        const dy = (newTop - startTop) / steps;
        function animateStep() {
          step++;
          setGuyPos((p) => p ? { left: p.left + dx, top: p.top + dy } : { left: startLeft + dx, top: startTop + dy });
          if (step < steps) {
            setTimeout(animateStep, 13); // a bit faster
          } else {
            setGuyPos({ left: newLeft, top: newTop });
            animatingShoot.current = false;
          }
        }
        animateStep();
        shootTimeout.current = setTimeout(() => { shootTimeout.current = null; }, 1000);
      }
    };
    window.addEventListener('mousemove', moveGuy);
    return () => window.removeEventListener('mousemove', moveGuy);
  }, [shootMode, guyPos]);
  useEffect(() => () => { if (shootTimeout.current) clearTimeout(shootTimeout.current); }, []);

  // --- Chatbot box: modern look, absolutely positioned relative to guy, clamps to page edges ---
  // Make chat box bigger
  const chatBoxWidth = 440; // px (was 360)
  const chatBoxHeight = 320; // px (was 240)
  const getChatBoxPosition = () => {
    if (!guyPos) return { top: 0, left: 0 };
    const pageW = document.documentElement.scrollWidth;
    const pageH = document.documentElement.scrollHeight;
    let left = 80 + 16; // right side by default, relative to guy
    let top = 40 - chatBoxHeight / 2; // center on guy, relative
    // Clamp right
    if (guyPos.left + left + chatBoxWidth > pageW) {
      left = -chatBoxWidth - 16;
    }
    // Clamp left
    if (guyPos.left + left < 0) {
      left = -guyPos.left + 8;
    }
    // Clamp top/bottom to page
    if (guyPos.top + top + chatBoxHeight > pageH) {
      top = pageH - guyPos.top - chatBoxHeight - 8;
    }
    if (guyPos.top + top < 0) {
      top = -guyPos.top + 8;
    }
    return { top, left };
  };

  // --- Auto-scroll chat box to bottom on new message ---
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, chatOpen]);

  // --- Page descriptions for 'Tell me about this page' ---
  const pageDescriptions: Record<string, string> = {
    '/': "This is the home page of the portfolio. Here you'll find a quick intro and a link to explore my projects.",
    '/about': "This page is all about Mark, his personality, hobbies and background. Sheesh he seems super smart and cool.",
    '/projects': "Here you can browse through the projects, from university assignments to personal experiments and hackathon entries.",
    '/skills': "This page lists technical, creative, and soft skills, along with the tools and languages used.",
    '/experience': "On this page you'll find work experience, internships, and other relevant roles. Every aspect helps build some skills, whether its social or computing related.",
    '/qualifications': "This page showcases academic qualifications, certificates, and achievements. As well as some information about the university modules taken.",
  };
  function getPageDescription(path: string) {
    // Try to match exact, then by prefix (for dynamic routes)
    if (pageDescriptions[path]) return pageDescriptions[path];
    if (path.startsWith('/projects')) return pageDescriptions['/projects'];
    if (path.startsWith('/about')) return pageDescriptions['/about'];
    if (path.startsWith('/skills')) return pageDescriptions['/skills'];
    if (path.startsWith('/experience')) return pageDescriptions['/experience'];
    if (path.startsWith('/qualifications')) return pageDescriptions['/qualifications'];
    return "This is a page on my portfolio site. I'm going to be honest, I don't have a description for this yet.";
  }

  // --- Chat options, including shoot mode ---
  const handleOption = (option: string) => {
    if (option === 'Tell me about this page') {
      setMessages((msgs) => [
        ...msgs,
        { from: 'user', text: 'Tell me about this page', key: getUniqueKey() }
      ]);
      setTimeout(() => {
        setMessages((msgs) => [
          ...msgs,
          { from: 'guy', text: getPageDescription(pathname), key: getUniqueKey() }
        ]);
      }, 500);
      return;
    }
    if (option === 'Say hi') {
      const userKey = getUniqueKey();
      setMessages((msgs) => {
        const newMsgs = [
          ...msgs,
          { from: 'user' as const, text: 'Hi', key: userKey }
        ];
        return newMsgs;
      });
      setTimeout(() => {
        setMessages((msgs) => {
          let reply = hiCount >= 1 ? 'Yes hello again' : 'Hello!';
          return [
            ...msgs,
            { from: 'guy' as const, text: reply, key: getUniqueKey() }
          ];
        });
        setHiCount((c) => c + 1);
      }, 500);
    }
    if (option === 'How are you') {
      setMessages((msgs) => [...msgs, { from: 'user', text: 'How are you?', key: getUniqueKey() }])
      setTimeout(() => {
        setMessages((msgs) => [...msgs, { from: 'guy', text: 'I am feeling animated!', key: getUniqueKey() }])
      }, 500)
    }
    if (option === 'Bet i could shoot you') {
      setMessages((msgs) => [...msgs, { from: 'user', text: 'Bet i could shoot you', key: getUniqueKey() }])
      setTimeout(() => {
        setMessages((msgs) => [...msgs, { from: 'guy', text: 'Oh yeah? Try to click me!', key: getUniqueKey() }])
      }, 300)
      setTimeout(() => {
      setShootMode(true)
      setChatOpen(false)
      }, 1000)
    }
    if (option === 'Hidden secret') {
      setMessages((msgs) => [...msgs, { from: 'user', text: 'Secret?', key: getUniqueKey() }])
      setTimeout(() => {
        setMessages((msgs) => [...msgs, { from: 'guy', text: 'If you hold space and move your mouse, you will see a rainbow!', key: getUniqueKey() }])
      }, 500)
    }
    
  }

  // Render
  return (
    <>
      {shootMode && (
        <>
          {/* Vignette overlay - slightly darker */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              pointerEvents: 'auto',
              zIndex: 9999,
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.62) 100%)',
              transition: 'background 0.3s',
            }}
            aria-hidden="true"
          />
          {/* Block pointer events for everything except the guy */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9998,
              pointerEvents: 'auto',
            }}
            onClick={e => e.stopPropagation()}
          />
        </>
      )}
      {shootMode && <Crosshair color={resolvedTheme === 'dark' ? '#60A5FA' : '#2563EB'} speed={0.35} />}
      <AnimatePresence>
        {visible && guyPos && (
          <motion.div
            ref={guyRef}
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, x: 0, opacity: 1 }}
            exit={{ y: -200, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 18 }}
            className={`absolute z-[10000] flex`}
            style={{ top: guyPos.top, left: guyPos.left, cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none', pointerEvents: 'auto' }}
            onMouseDown={handleDragStart}
          >
            <div className="relative flex flex-col items-center">
              <motion.div
                className="w-20 h-28 flex items-center justify-center cursor-pointer pointer-events-auto"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleGuyClick}
                style={{ zIndex: 2000 }}
              >
                {/* Stickman SVG */}
                <svg width="60" height="100" viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="20" r="12" stroke={resolvedTheme === 'dark' ? '#60A5FA' : '#2563EB'} strokeWidth="3" fill={resolvedTheme === 'dark' ? '#1E293B' : '#DBEAFE'} />
                  <line x1="30" y1="32" x2="30" y2="65" stroke={resolvedTheme === 'dark' ? '#60A5FA' : '#2563EB'} strokeWidth="3" />
                  <line x1="30" y1="40" x2="10" y2="55" stroke={resolvedTheme === 'dark' ? '#60A5FA' : '#2563EB'} strokeWidth="3" />
                  <line x1="30" y1="40" x2="50" y2="55" stroke={resolvedTheme === 'dark' ? '#60A5FA' : '#2563EB'} strokeWidth="3" />
                  <line x1="30" y1="65" x2="15" y2="90" stroke={resolvedTheme === 'dark' ? '#60A5FA' : '#2563EB'} strokeWidth="3" />
                  <line x1="30" y1="65" x2="45" y2="90" stroke={resolvedTheme === 'dark' ? '#60A5FA' : '#2563EB'} strokeWidth="3" />
                </svg>
              </motion.div>
              <AnimatePresence>
                {showBubble && (
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 z-[110] pointer-events-none"
                    style={{
                      // Move bubble closer to the head, and tail closer to the guy's face
                      transform: 'translateX(-50%)',
                      minWidth: 0,
                    }}
                  >
                    <div
                      className="relative px-4 py-1.5 rounded-2xl shadow-xl text-gray-900 dark:text-gray-100 bg-white/95 dark:bg-gray-900/95 border border-gray-200 dark:border-gray-700 text-base font-semibold flex items-center gap-2"
                      style={{
                        boxShadow: '0 4px 24px 0 rgba(31,38,135,0.10)',
                        borderRadius: 16,
                        border: resolvedTheme === 'dark' ? '1.5px solid #334155' : '1.5px solid #e5e7eb',
                        background: resolvedTheme === 'dark' ? 'rgba(30,41,59,0.97)' : 'rgba(255,255,255,0.97)',
                        color: resolvedTheme === 'dark' ? '#F1F5F9' : '#1E293B',
                        fontWeight: 600,
                        letterSpacing: 0.01,
                        minWidth: 0,
                        minHeight: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        paddingLeft: 18,
                        paddingRight: 18,
                        paddingTop: 7,
                        paddingBottom: 7,
                        transition: 'background 0.2s, color 0.2s',
                      }}
                    >
                      Click me!
                      {/* Speech bubble tail, angled to point at the guy's head */}
                      <span
                        className="absolute left-1/2 -bottom-3 z-10"
                        style={{
                          transform: 'translateX(-60%) rotate(8deg)',
                          width: 0,
                          height: 0,
                          borderLeft: '10px solid transparent',
                          borderRight: '10px solid transparent',
                          borderTop: resolvedTheme === 'dark' ? '13px solid #1E293B' : '13px solid #fff',
                          filter: resolvedTheme === 'dark' ? 'drop-shadow(0 2px 2px #334155)' : 'drop-shadow(0 2px 2px #e5e7eb)',
                        }}
                      ></span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Modern chatbot box, always at side, clamped to viewport */}
            {chatOpen && (
              <div
                className="absolute select-none bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-2xl z-[3000] p-4 flex flex-col gap-2 w-[27.5rem] max-w-[98vw] chatbot-box"
                style={{
                  top: getChatBoxPosition().top,
                  left: getChatBoxPosition().left,
                  height: chatBoxHeight,
                  minHeight: 180,
                  maxHeight: 420,
                  overflowY: 'auto',
                  boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
                  borderRadius: 18,
                  border: '1.5px solid #e5e7eb',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <div ref={chatBoxRef} className="flex-1 flex flex-col gap-2 overflow-y-auto pb-2">
                  {messages.map((msg, i) => (
                    <div key={msg.key || i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}> 
                      <div className={`rounded-2xl px-4 py-2 max-w-[80%] shadow-md text-sm font-medium ${msg.from === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'} chatbot-bubble`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-2 border-t pt-2 border-gray-200 dark:border-gray-700">
                  <button
                    className="px-4 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold hover:bg-blue-100 dark:hover:bg-gray-600 transition text-sm border border-gray-300 dark:border-gray-600 chatbot-option"
                    onClick={() => handleOption('Tell me about this page')}
                  >
                    Tell me about this page
                  </button>
                  <button
                    className="px-4 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold hover:bg-blue-100 dark:hover:bg-gray-600 transition text-sm border border-gray-300 dark:border-gray-600 chatbot-option"
                    onClick={() => handleOption('Say hi')}
                  >
                    Say hi
                  </button>
                  <button
                    className="px-4 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold hover:bg-blue-100 dark:hover:bg-gray-600 transition text-sm border border-gray-300 dark:border-gray-600 chatbot-option"
                    onClick={() => handleOption('How are you')}
                  >
                    How are you
                  </button>
                  <button
                    className="px-4 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold hover:bg-blue-100 dark:hover:bg-gray-600 transition text-sm border border-gray-300 dark:border-gray-600 chatbot-option"
                    onClick={() => handleOption('Bet i could shoot you')}
                  >
                    Bet i could shoot you
                  </button>
                  <button
                    className="px-4 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold hover:bg-blue-100 dark:hover:bg-gray-600 transition text-sm border border-gray-300 dark:border-gray-600 chatbot-option"
                    onClick={() => handleOption('Hidden secret')}
                  >
                    Hidden secret
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default LittleGuy
