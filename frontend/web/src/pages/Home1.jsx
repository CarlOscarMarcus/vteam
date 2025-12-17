// Hem

import elsparkcykel from "../assets/img/elsparkcykel.jpg";
import scooter from "../assets/img/scooter.jpg";
import money from "../assets/img/money.jpg.avif";
import earth from "../assets/img/earth.jpg.avif";

export default function Home() {


  return (
    <>
      <div>

        <div className="hero">
          <img className="home-img1" src={elsparkcykel} alt="Elsparkcykel" />
          <h1>Hyr din elsparkcykel hos oss!</h1>
        </div>

        <div className="home-container1">
          <img className="home-img2-1" src={scooter} alt="Scooter" />
          <h3 className="home-h3-1">
            Hyr en elsparkcykel på bara några sekunder och ta dig dit du vill utan krångel. 
            Perfekt för både vardagsärenden och spontana utflykter.
          </h3>
        </div>

        <div className="home-container2">
          <img className="home-img2-2" src={money} alt="Money" />
          <h3 className="home-h3-2">
            Betala endast för den tid du använder. 
            Våra priser är anpassade för att ge dig maximal frihet utan att 
            det kostar mer än nödvändigt.
          </h3>
        </div>

        <div className="home-container3">
          <img className="home-img2-3" src={earth} alt="Earth" />
          <h3 className="home-h3-3">
            Genom att välja elsparkcykel bidrar du till en renare och tystare stad. 
            Ett hållbart, modernt och klimatsmart transportalternativ.
          </h3>
        </div>

      </div>
    </>
  )
}
