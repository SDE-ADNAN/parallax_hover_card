import React, { useEffect } from 'react';

function pointCardToCursor() {
  const card = document.querySelector('.card');
  window.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    card.style.transform = `translate(${x}px, ${y}px)`;
  });
}

function TransformHeroes() {
  useEffect(() => {
    const elements = document.querySelectorAll('.card');
    const perspective = "1000px";
    const delta = 6;

    elements.forEach((element) => {
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      const midWidth = width / 2;
      const midHeight = height / 2;

      const handleMouseMove = (e) => {
        const pos = element.getBoundingClientRect();
        const cursPosX = (e.pageX - pos.left);
        const cursPosY = e.pageY - pos.top;
        const cursCenterX = midWidth - cursPosX;
        const cursCenterY = midHeight - cursPosY;

        element.style.transform = `perspective(${perspective}) rotateX(${cursCenterY / delta}deg) rotateY(${-cursCenterX / delta}deg)`;
        element.classList.remove('is-out');
      };

      const handleMouseLeave = () => {
        element.classList.add('is-out');
      };

      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);

      
      return () => {
        // pointCardToCursor();
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  return null;
}

export default TransformHeroes;
