'use client'
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ClientModelWrapper from './ClientModelWrapper';
import YouTubeCarousel from './YouTubeCarousel';
import Navbar from './Navbar';
import CardForm from './CardForm';
import Vfx from './Vfx'
import ImageCarousel from './ImageCarousel';
import './style.css'

const imgs = ['/imgsshown/Disaster1.jpg',
               '/imgsshown/Disaster3.jpg',
               '/imgsshown/FearLove.jpg',
               '/imgsshown/FearLove2.jpg',
               '/imgsshown/IsIt3.jpg',
               '/imgsshown/Math2.jpg',
               '/imgsshown/My_india_2.jpg',
               '/imgsshown/Screenshot (1).png',
               '/imgsshown/Screenshot (2).png',
               '/imgsshown/Screenshot (73).png',
               '/imgsshown/Screenshot (138).png',
               '/imgsshown/Screenshot (247).png',
]

const contents = {
  cont1 : 'Just three childhood buddies with zero film background and 100% obsession with movies.We didn’t know anything about filmmaking — still kinda don’t — but our wild ideas clicked, and boom… Movies Radio was born.We’re figuring it out as we go, shooting dreams with a camera (sometimes literally).Not pros, just passionate.Welcome to our chaos. Welcome to Movies Radio.',
  
  cont2 : 'We’re R.S.R.C.Dinesh, Prem Kumar, and Chandrasekhar — three movie maniacs with a dream (and no backup plan).One loves writing scripts and acting, another’s into editing and 3D animation,VFX , and the third’s obsessed with cinematography and direction. Basically, we’re a one-stop chaos crew.Together, we are Movies Radio — low budget, high passion, and dangerously creative.',
  
  cont3 : 'Made a film at 19. Won 2nd place. Thought it was a fluke.Made another. Won again. Now we were suspicious.Then boom — Anurag Kashyap and Hansal Mehta gave us an award.We peaked (emotionally).Not all our films are hits, but making them? Pure cinematic madness — and we love it.',
  
  cont4 : 'We’re not just playing filmmaker — we’re living it. The dream? To build a wild, unstoppable crew of storytellers like us. If you’re someone who doesn’t just want to say the story, but show it — welcome aboard. One goal. One frame at a time. An indie film. Made with madness.',
}


function OverlayCards() {
    const cards = [
      { id: 1, title: 'Our Origin Story', text: contents.cont1, type: 'left' , src : '/imgs/Trauma_set.jpg'},
      { id: 2, title: 'Who We Are', text: contents.cont2, type: 'right', src : '/imgs/Disaster.jpg' },
      { id: 3, title: 'A Journey of Achievements', text: contents.cont3, type: 'left', src : '/imgs/IsIt4.jpg' },
      { id: 4, title: 'Our Aspirations for the Future', text: contents.cont4, type: 'right', src : '/imgs/high_on_oblivion.jpg' }
    ];
        
    

    return (
      <>
      <div className="card-container saira-semi-condensed-regular">
        <section id="About">
          <div>
          <h2>About</h2>
          {cards.map(card => (
            <div key={card.id} className={`card ${card.type}`}>
              {card.type === 'left' ? (
              <>
                <div className="card-text">
                  <img src={card.src} alt=""/>
                  <div>
                    <h2>{card.title}</h2><p>{card.text}</p>
                  </div>
                </div>
              </>
              ) : (
              <>
                <div className="card-text">
                  <div>
                    <h2>{card.title}</h2><p>{card.text}</p>
                  </div>
                  <img src={card.src} alt=""/> 
                </div>
              </>
              )}
            </div>
          ))}
          </div>
        </section>
        {/* ///////////////works////////////// */}
        <section id="Work">
        <div>
          <h2>Works</h2>
          <YouTubeCarousel/>
        </div>
        <div>
          <h2>Editing Works</h2>
          <Vfx/>
        </div>
        <div>
          <h2>The Journey so far</h2>
          <ImageCarousel images={imgs}/>
        </div>
        </section>
        <section id="Collab">
        <div>
          <h2>Collab</h2>
          <CardForm/>
        </div>
        </section>
      </div>
      </>
    );
  }
  

export default function Home() {
  const [isLaptop, setIsLaptop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLaptop(window.innerWidth >= 1024); // adjust breakpoint as needed
    };

    handleResize(); // check on load
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your Page Title</title>
      </Head>
    <main style={{ height: '100vh' }}>
      <Navbar/>
      <OverlayCards/>
      {isLaptop && <ClientModelWrapper />}
    </main>
    </>
  );
}
