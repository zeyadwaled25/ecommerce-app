import { Carousel } from 'react-bootstrap';
import Image1 from '../../images/Image1.jpg';
import Image2 from '../../images/Image2.jpg';
import Image3 from '../../images/Image3.jpg';


function Slider() {
  return (
    <Carousel controls={false} indicators={false} interval={5000} pause={false}>
      <Carousel.Item>
        <img
          src={Image1}
          className="d-block w-100"
          alt="Image 1"
          style={{ height: "100vh" }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={Image2}
          className="d-block w-100"
          alt="Image 2"
          style={{ height: "100vh" }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={Image3}
          className="d-block w-100"
          alt="Image 3"
          style={{ height: "100vh" }}
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;

