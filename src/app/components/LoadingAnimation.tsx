import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LoadingAnimation = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(textRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
      .to(textRef.current, { opacity: 0, duration: 1 });
  }, []);

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <h1 ref={textRef}>Loading...</h1>
    </div>
  );
};

export default LoadingAnimation;
