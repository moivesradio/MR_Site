import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

export default function ImageCarousel({ images = [] }) {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const slideWidth = el.offsetWidth / 3;
    const index = Math.round(el.scrollLeft / slideWidth);
    setCurrentIndex(index);
  };

  const scrollToImage = (index) => {
    const el = carouselRef.current;
    const slideWidth = el.offsetWidth / 3;
    el.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleResize = () => scrollToImage(currentIndex);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex]);

  // Drag functionality for desktop
  const startDrag = (e) => {
    isDragging.current = true;
    carouselRef.current.classList.add('dragging');
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const onDrag = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2; // scroll speed
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const stopDrag = () => {
    isDragging.current = false;
    carouselRef.current.classList.remove('dragging');
  };

  return (
    <div className="youtube-carousel">
      <div
        className="carousel-track"
        ref={carouselRef}
        onScroll={handleScroll}
        onMouseDown={startDrag}
        onMouseMove={onDrag}
        onMouseLeave={stopDrag}
        onMouseUp={stopDrag}
      >
        {images.map((src, index) => (
          <div className="carousel-slide" key={index}>
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              layout="responsive"
              width={300}
              height={200}
              className="carousel-image"
              style={{borderRadius:'10px'}}
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => scrollToImage(index)}
          />
        ))}
      </div>

      <style jsx>{`
        .carousel-wrapper {
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          user-select: none; /* Prevent text/image selection */
        }

        .carousel-track {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          cursor: grab;
          scrollbar-width: none;
        }

        .carousel-track.dragging {
          cursor: grabbing;
        }

        .carousel-slide {
          flex: 0 0 calc(100% / 3); /* 3 images per view */
          scroll-snap-align: start;
          padding: 8px;
          box-sizing: border-box;
          user-select: none;
          pointer-events: none; /* Disable click while dragging */
        }
        

        .carousel-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
          pointer-events: auto; /* Re-enable click inside image */
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }

        .dot {
          width: 10px;
          height: 10px;
          margin: 0 5px;
          border-radius: 50%;
          background-color: #ccc;
          cursor: pointer;
        }

        .dot.active {
          background-color: #333;
        }

        @media only screen and (max-width: 988px) {
          .carousel-slide {
          flex: 0 0 100%; /* 3 images per view */
          }
          .dot {
          width: 5px;
          height: 5px;
          margin: 0 2.5px;
          }
          .carousel-image {
          width: 80%;
        }
        }
      `}</style>
    </div>
  );
}
