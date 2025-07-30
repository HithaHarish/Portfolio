import React, { useEffect, useRef } from 'react';
import './styles/Education.css';

const cardData = [
  {
    title: "B.E. - Computer Science Engineering",
    subtitle: "B M S College of Engineering, Bangalore",
    text: "Knights are unique in their movement pattern, capable of hopping over other pieces in a way that bishops and rooks cannot...",
    counter: "1/3"
  },
];

export default function Education() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const cards = cardRefs.current;
      const containerTop = container.offsetTop;
      const windowHeight = window.innerHeight + 300;
      const scrollY = window.scrollY;
      const progress = Math.max(0, (scrollY - containerTop + windowHeight) / (windowHeight * 2));
      const numCards = cards.length;

      for (let index = numCards - 1; index >= 0; index--) {
        const card = cards[index];
        if (index === numCards - 1) {
          if (scrollY > containerTop - windowHeight * 0.2) {
            card.classList.add('slide-up');
          } else {
            card.classList.remove('slide-up');
          }
        } else {
          if (index >= numCards - progress && index !== numCards - 1) {
            card.classList.add('slide-up');
          } else {
            card.classList.remove('slide-up');
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div style={{ height: "50vh" }} />
      <div ref={containerRef} className="stack-cards-container">
        <div className="stack-cards">
          {cardData.map((card, i) => (
            <div
              className="stack-cards__item"
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <div className="inner">
                <h3>{card.title}</h3>
                <h4>{card.subtitle}</h4>
                <p>{card.text}</p>
                <div className="counter">{card.counter}</div>
              </div>
              <div className="shadow"></div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: "30vh" }} />
    </>
  );
}
