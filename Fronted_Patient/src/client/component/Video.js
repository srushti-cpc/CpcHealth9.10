import React, { useEffect, useRef, useState } from 'react';
import IntroImage from '../assets/introimage.png';
import IntroVideo from '../assets/Introvideo.mp4';
import '../style/video.css';
const Video = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    const handlePlayPause = (e) => {
      if (e.type === 'play') {
        setIsPlaying(true);
      } else if (e.type === 'pause' || e.type === 'ended') {
        setIsPlaying(false);
      }
    };

    video.addEventListener('play', handlePlayPause);
    video.addEventListener('pause', handlePlayPause);
    video.addEventListener('ended', handlePlayPause);

    return () => {
      video.removeEventListener('play', handlePlayPause);
      video.removeEventListener('pause', handlePlayPause);
      video.removeEventListener('ended', handlePlayPause);
    };
  }, []);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (

    <section className="HomeVideoSection relative">
      <section class="section-meals" id="meals">
        <div class="container center-text">
          <span class="subheading">A Message from our Founder</span>
          <h2 class="heading-secondary">
            Emerging trends in Food Bank Industry
          </h2>
        </div>
      </section>
      <div className="HomeVideoOuter">
        <div className="wrapper">
          <div className="HomeVideoInner">
            <div
              className="Video-playbtn"
              style={{ display: isPlaying ? 'none' : 'flex' }}
              onClick={handleVideoClick}
            >
              <svg
                id="Component_16_9"
                data-name="Component 16 – 9"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="17"
                viewBox="0 0 15 17"
              >
                <path
                  id="Polygon_2"
                  data-name="Polygon 2"
                  d="M8.5,0,17,15H0Z"
                  transform="translate(15) rotate(90)"
                  fill="#fff"
                />
              </svg>
            </div>
            <div className="StoryVideo">
              <video
                id="rightVideo"
                ref={videoRef}
                playsInline
                controls
                poster={IntroImage}
              >
                <source type="video/mp4" src={IntroVideo} />
                <track kind="captions" />
              </video>
            </div>
            <div className={`HomeVideoTitleSection ${isPlaying ? 'animate_it' : 'animate_reverse'}`}>
              <div className="SectionTitle">
                <h2>

                </h2>
              </div>
              <div className="SectionContent">
                <p>In this video, our co-founder shares our impassioned journey, illuminating how we bridge communities and corporations to combat food insecurity. Join us as we unite for a world where everyone thrives, ensuring equitable access to sustenance and opportunity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Video;
