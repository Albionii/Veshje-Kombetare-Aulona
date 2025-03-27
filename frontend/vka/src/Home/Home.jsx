import React, { useEffect } from 'react';
import Header from './Header';
import Ballina from './Ballina.jpg';
import SmallBallina from './SmallBallina.png';

export default function Home() {
  useEffect(() => {
    const img1 = new Image();
    img1.src = Ballina;
    const img2 = new Image();
    img2.src = SmallBallina;
  }, []);

  return (
    <>
      <Header pos={false} />
      <img src={Ballina} alt="" className="full-height-image md:block hidden" />
      <img src={SmallBallina} alt="" className="full-height-image md:hidden" />
    </>
  );
}
