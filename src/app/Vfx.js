import { useState, useEffect } from 'react';
import Image from 'next/image';
import './YoutubeCarousel.css'

// Utility function to get a YouTube thumbnail URL from a video link
function getThumbnail(link) {
  const videoId = new URL(link).searchParams.get('v');
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

const youtubeVideos = [
  {
    id: 1,
    title: "Sample Video 1",
    url: 'https://drive.google.com/file/d/1evgxKz1r3rk7QlV7IT-ledPVQhSHhfhb/preview',
    thumbnail: '/vfxtn/thumbnail1.png',
},
{
    id: 2,
    title: "Sample Video 2",
    url: 'https://drive.google.com/file/d/1_y4-P0sPnHYznjOZ-ua4b50iidWQg8UQ/preview',
    thumbnail: '/vfxtn/thumbnail3.jpg',
},
{
    id: 3,
    title: "Sample Video 3",
    url: 'https://drive.google.com/file/d/1k15x9nVWVpnn9OUTyv93eq8YKGnfLDkO/preview',
    thumbnail: '/vfxtn/thumbnail2.png',
},
{
    id: 4,
    title: "Sample Video 4",
    url: "https://www.youtube.com/watch?v=5T0Pu4gw7j0",
    thumbnail: getThumbnail('https://www.youtube.com/watch?v=5T0Pu4gw7j0'),
  },
  {
    id: 5,
    title: "Sample Video 5",
    url: "https://www.youtube.com/watch?v=Muo3o0-v4xY",
    thumbnail: getThumbnail('https://www.youtube.com/watch?v=Muo3o0-v4xY'),
  },
  {
    id: 6,
    title: "Sample Video 6",
    url: "https://drive.google.com/file/d/1dlr5G3v13XlJlT_loCi3tC0OQN_KNMEr/preview",
    thumbnail: '/vfxtn/thumbnail6.jpg',
  },
];

const Vfx = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cycle next and previous using modulo arithmetic for infinite loop
  const nextVideo = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % youtubeVideos.length);
  const prevVideo = () =>
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + youtubeVideos.length) % youtubeVideos.length
    );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextVideo();
      } else if (e.key === "ArrowLeft") {
        prevVideo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Calculate visible videos: previous, current, next
  const getVisibleVideos = () => {
    const total = youtubeVideos.length;
    const prev = youtubeVideos[(currentIndex - 1 + total) % total];
    const current = youtubeVideos[currentIndex];
    const next = youtubeVideos[(currentIndex + 1) % total];
    return [prev, current, next];
  };

  const visibleVideos = getVisibleVideos();

  return (
    <div className="youtube-carousel">
      <div className="carousel-container">
        <button
          onClick={prevVideo}
          className="nav-btn prev"
          aria-label="Previous video"
        >
        <img src="/icons/arrow_back.png" alt="Previous" width={24} height={24} />
        </button>
        <div className="carousel">
          {visibleVideos.map((video, idx) => (
            <div
              key={`${video.id}-${idx}`}
              className="carousel-item"
              onClick={() => window.open(video.url, "_blank")}
            >
              <div className="video-card">
                <div className="thumbnail-container">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    width={400}
                    height={275}
                    unoptimized
                  />
                </div>
                {/* <div className="video-title">{video.title}</div> */}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={nextVideo}
          className="nav-btn next"
          aria-label="Next video"
        >
        <img src="/icons/arrow_forward.png" alt="Previous" width={24} height={24} />
        </button>
      </div>
      <div className="carousel-dots">
        {youtubeVideos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`dot ${idx === currentIndex ? "active" : ""}`}
            aria-label={`Go to video ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Vfx;
