import { useEffect, useRef } from 'react';

const useIntersectionObserver = (options) => {
  const elementsRef = useRef([]);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        } else {
          entry.target.classList.remove('animate');
        }
      });
    }, options);

    elementsRef.current.forEach((el) => {
      if (el) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        elementsRef.current.forEach((el) => {
          if (el) observerRef.current.unobserve(el);
        });
      }
    };
  }, [options]);

  return elementsRef;
};

export default useIntersectionObserver;
