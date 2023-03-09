import React, { useEffect, useState } from "react";
import "./App.css"
import { motion, AnimatePresence } from "framer-motion";

const cars = [
  { rank: '10', speed: "6:57.0s", name: "Porsche 918 Spyder", img: "https://media.autoexpress.co.uk/image/private/s--mv8I44qO--/f_auto,t_content-image-full-desktop@1/v1605780976/autoexpress/2020/11/Nurburgring%20lap%20times%20record-22.jpg" },
  { rank: '01', speed: "6:35.2s", name: "Mercedes-AMG One", img: "https://media.autoexpress.co.uk/image/private/s--bkpH_SoH--/f_auto,t_content-image-full-desktop@1/v1668090440/autoexpress/2022/11/Mercedes%20AMG-One%20Nurburgring.jpg" },
  { rank: '09', speed: "6:56.4s", name: "Porsche 911 GT3 RS", img: "https://media.autoexpress.co.uk/image/private/s--rFz0qJzE--/f_auto,t_content-image-full-desktop@1/v1605780970/autoexpress/2020/11/Nurburgring%20lap%20times%20record-7.jpg" },
  { rank: '08', speed: "6:55.3s", name: "Porsche 911 GT3", img: "https://media.autoexpress.co.uk/image/private/s--PplZeDHt--/f_auto,t_content-image-full-desktop@1/v1618844286/autoexpress/2021/04/Porsche%20911%20GT3%20.jpg" },
  { rank: '07', speed: "6:52.0s", name: "Lamborghini Huracan Performante", img: "https://media.autoexpress.co.uk/image/private/s--p08ypy7i--/f_auto,t_content-image-full-desktop@1/v1605780976/autoexpress/2020/11/Nurburgring%20lap%20times%20record-24.jpg" },
  { rank: '06', speed: "6:49.3s", name: "Porsche 911 GT3 RS", img: "https://media.autoexpress.co.uk/image/private/s--njYH4QJO--/f_auto,t_content-image-full-desktop@1/v1665667869/autoexpress/2022/10/Porsche%20911%20GT3%20RS%20ring%20.jpg" },
  { rank: '04', speed: "6:44.9s", name: "Lamborghini Aventador SVJ ", img: "https://media.autoexpress.co.uk/image/private/s--QxZn-18p--/f_auto,t_content-image-full-desktop@1/v1605780979/autoexpress/2020/11/Nurburgring%20lap%20times%20record-26.jpg" },
  { rank: '05', speed: "6:47.3s", name: "Porsche 911 GT2 RS", img: "https://media.autoexpress.co.uk/image/private/s--iUe2AtzV--/f_auto,t_content-image-full-desktop@1/v1605780977/autoexpress/2020/11/Nurburgring%20lap%20times%20record-25.jpg" },
  { rank: '03', speed: "6:43.6s", name: "Mercedes-AMG GT Black Series", img: "https://media.autoexpress.co.uk/image/private/s--5EntFBXP--/f_auto,t_content-image-full-desktop@1/v1605780979/autoexpress/2020/11/Nurburgring%20lap%20times%20record-28.jpg" },
  { rank: '02', speed: "6:43.3s", name: "Porsche 911 GT2 RS Manthey-Racing", img: "https://media.autoexpress.co.uk/image/private/s--JCb7mjR4--/f_auto,t_content-image-full-desktop@1/v1624609924/autoexpress/2021/06/Porsche%20911%20GT2%20Manthey%20Racing%20Nurburgring%20lap%20record-4.jpg" },
];

const App = () => {
  const [hoverInfo, setHoverInfo] = useState(null);
  useEffect(() => {
    const gallery = document.getElementById("gallery");

    const handleMouseMove = (e) => {
      const mouseX = e.clientX,
        mouseY = e.clientY;

      const xDecimal = mouseX / window.innerWidth,
        yDecimal = mouseY / window.innerHeight;

      const maxX = gallery.offsetWidth - window.innerWidth,
        maxY = gallery.offsetHeight - window.innerHeight;

      const panX = maxX * xDecimal * -1,
        panY = maxY * yDecimal * -1;

      gallery.animate(
        {
          transform: `translate(${panX}px, ${panY}px)`,
        },
        {
          duration: 7000,
          fill: "forwards",
          easing: "ease",
        }
      );
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleHover = (name, speed, ranking) => {
    setHoverInfo({ name, speed, ranking });
  };

  return (
    <AnimatePresence>
      <div>
        <div className="pointer-events-none mix-blend-difference z-50 absolute top-0 w-screen h-screen">
          <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: "linear" }} className="absolute bottom-4 w-full justify-center items-center flex text-white">
            <h1 className="text-xl text-center">TOP 10 FASTEST <span>NURBURGRING LAP</span> TIMES BY PRODUCTION CARS</h1>
          </motion.div>

          <div className="flex justify-center items-center text-white h-full">

            {hoverInfo && (
              <div className="text-5xl flex flex-col items-center">
                <p className="text-lg">{hoverInfo.ranking}/10</p>
                <h2>{hoverInfo.name}</h2>
                <p className="text-2xl">{hoverInfo.speed}</p>
              </div>
            )}
          </div>
        </div>
        <div id="gallery">
          {cars.map((car) => (
            <div className="tile" onMouseEnter={() => handleHover(car.name, car.speed, car.rank)}>
              <img src={car.img} alt={car.name} />
            </div>
          ))}
          <div className="tile Dolce text-white text-2xl" onMouseEnter={() => handleHover("A Website Developed By Flawless Productions", "Visit Our Website")}>
            <a href="https://flawlessproductions.netlify.app/">FLAWLESS PRODUCTIONS</a>
          </div>
        </div>
    </div>
    </AnimatePresence>
  );
};

export default App;
