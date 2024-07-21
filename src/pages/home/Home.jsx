import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";
// import { AccessAlarm } from "@mui/icons-material";

import { FaBeer } from "react-icons/fa";

import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import Card from "../../components/card/Card";
import { cards, projects } from "../../data";
import { gigService } from "../../services/gigService";
import { Link } from "react-router-dom";

function Home() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    fetchGigs();
  }, []);

  useEffect(() => {}, [gigs]);

  const fetchGigs = async () => {
    try {
      const response = await gigService.getAllGigs();
      setGigs(response.data);
    } catch (error) {}
  };

  return (
    <div className="home">
      <Featured />

      {/* <TrustedBy /> */}

      {gigs.length > 0 && (
        <div className="featured_artists">
          <h1>Top Work:</h1>
          <Slide slidesToShow={4} arrowsScroll={4}>
            {gigs.map((item, index) => (
              <Card key={item._id} card={item} />
            ))}
          </Slide>
        </div>
      )}

      {/* <Link to="/gigs?category="></Link> */}

      <div className="explore">
        <div className="container">
          <h1>Explore the marketplace:</h1>
          <div className="items">
            <Link to="/gigs?category=digitalArtists">
              <div className="item">
                <img src="/img/digital-art.png" alt="" />
                <div className="line"></div>
                <span>Digital Art</span>
              </div>
            </Link>

            <Link to="/gigs?category=craftArtists">
              <div className="item">
                <img src="/img/crafting.png" alt="" />
                <div className="line"></div>
                <span>Craft Art</span>
              </div>
            </Link>

            <Link to="/gigs?category=painters">
              <div className="item">
                <img src="/img/painter.png" alt="" />
                <div className="line"></div>
                <span>Painters</span>
              </div>
            </Link>

            <Link to="/gigs?category=photographers">
              <div className="item">
                <img src="/img/photographer.png" alt="" />
                <div className="line"></div>
                <span>Photographers</span>
              </div>
            </Link>

            <Link to="/gigs?category=sculptors">
              <div className="item">
                <img src="/img/sculptor.png" alt="" />
                <div className="line"></div>
                <span>Sculptors</span>
              </div>
            </Link>

            <Link to="/gigs?category=illustrators">
              <div className="item">
                <img src="/img/illustration.png" alt="" />
                <div className="line"></div>
                <span>Illustrations</span>
              </div>
            </Link>

            <Link to="/gigs?category=aiArtists">
              <div className="item">
                <img src="/img/ai.png" alt="" />
                <div className="line"></div>
                <span>AI Art</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>

      <div className="features">
        <div className="container">
          <div className="item">
            <h1>A whole world of freelance artists at your fingertips</h1>
            <div className="title">
              <span>&#10003;</span>
              The best for every budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates, just project-based
              pricing.
            </p>
            <div className="title">
              <span>&#10003;</span>
              Quality work done quickly
            </div>
            <p>Find the right freelancer to begin working on your project within minutes.</p>
            <div className="title">
              <span>&#10003;</span>
              Protected payments, every time
            </div>
            <p>
              Always know what you'll pay upfront. Your payment isn't released until you approve the
              work.
            </p>
            <div className="title">
              <span>&#10003;</span>
              24/7 support
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates, just project-based
              pricing.
            </p>
          </div>
        </div>
      </div>

      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>
              Design Crafters <i>business</i>
            </h1>
            <h1>
              A business solution designed for <i>artists</i>
            </h1>
            <p>
              Upgrade to a curated experience packed with tools and benefits, dedicated to businesses
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Connect to freelancers with proven business experience
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Get matched with the perfect artists by a customer success manager
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Manage teamwork and boost productivity with one powerful workspace
            </div>
            <button>Explore Design Crafters</button>
          </div>
          <div className="item">
            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
