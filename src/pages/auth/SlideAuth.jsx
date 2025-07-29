import { useEffect, useState } from "react";
import imageTest_2 from "../../assets/images/Bia-flic3.png";
import imageTest_3 from "../../assets/images/FLIC-CBGV.jpg";

const images = [imageTest_2, imageTest_3];
const SlideAuth = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative max-w-3xl w-full h-65 mx-auto overflow-hidden rounded-xl shadow-lg">
      <img
        src={images[current]}
        alt={`Slide ${current}`}
        className="w-full h-full object-cover transition duration-700 ease-in-out"
      />

      {/* Nút chuyển trái phải */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/10 text-white px-3 py-2 rounded-full hover:bg-black/20"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/10 text-white px-3 py-2 rounded-full hover:bg-black/20"
      >
        ❯
      </button>

      {/* Chấm tròn điều hướng */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
export default SlideAuth;
