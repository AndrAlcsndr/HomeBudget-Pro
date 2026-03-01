import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import ResumoTransacoes from "../ResumoTransacoes/ResumoTransacoes";
import CardCategoria from "./CardCategoria/CardCategoria";

function ResumoCategorias() {
  const [index, setIndex] = useState(0);

  return (
    <div className="w-[450px]">
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

        <Carousel.Item>
          <ResumoTransacoes />
        </Carousel.Item>

        <Carousel.Item>
          <ResumoTransacoes />
        </Carousel.Item>
      </Carousel>

      {/* Navegação custom */}
      <div
      className="d-flex w-[350px] flex space-between mt-[10px] text-[14px] text-[#6c757d]"
      >
        <span
          style={{ cursor: "pointer", opacity: index === 0 ? 0.4 : 1 }}
          onClick={() => index > 0 && setIndex(index - 1)}
        >
          ← Previous
        </span>

        <div>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                height: 8,
                width: 8,
                margin: "0 4px",
                display: "inline-block",
                borderRadius: "50%",
                backgroundColor: i === index ? "#2a9d8f" : "#ccc",
              }}
            />
          ))}
        </div>

        <span
          style={{ cursor: "pointer", opacity: index === 2 ? 0.4 : 1 }}
          onClick={() => index < 2 && setIndex(index + 1)}
        >
          Next →
        </span>
      </div>
    </div>
  );
}

export default ResumoCategorias;