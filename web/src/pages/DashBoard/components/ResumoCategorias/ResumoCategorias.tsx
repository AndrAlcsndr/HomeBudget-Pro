import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import CardCategoria from "./CardCategoria/CardCategoria";

function ResumoCategorias() {
  const [index, setIndex] = useState(0);

  return (
    <div style={{ width: "450px" }}>
      <Carousel
        activeIndex={index}
        onSelect={(selectedIndex) => setIndex(selectedIndex)}
        controls={false}
        indicators={false}
        interval={null}
      >
        <Carousel.Item>
          <CardCategoria />
        </Carousel.Item>

      </Carousel>

      
    </div>
  );
}

export default ResumoCategorias;