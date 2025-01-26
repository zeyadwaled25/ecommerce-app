import { useEffect } from "react";
import Image1 from '../../images/Image1.jpg';
import Image2 from '../../images/Image2.jpg';
import Image3 from '../../images/Image3.jpg';


function Slider() {
  useEffect(() => {
    const carousel = document.querySelector("#carouselExampleSlidesOnly");
    if (carousel) {
      new window.bootstrap.Carousel(carousel, {
        interval: 5000,
        ride: "carousel",
      });
    }
  }, []);

  return (
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" data-bs-pause="false">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={Image1}
            className="d-block w-100"
            alt="Image 1..."
            style={{ height: "100vh" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src={Image2}
            className="d-block w-100"
            alt="Image 2..."
            style={{ height: "100vh" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src={Image3}
            className="d-block w-100"
            alt="Image 3..."
            style={{ height: "100vh" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Slider;
