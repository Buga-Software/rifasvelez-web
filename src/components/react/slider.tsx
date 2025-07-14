import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';

interface Slide {
  src: string;
  alt: string;
}

const slides = [
  { src: '/assets/anticipados.png', alt: 'Anticipados' },
  { src: '/assets/cuota-inicial-mas-adicionales.png', alt: 'Cuota inicial' },
  { src: '/assets/opcional-al-mayor.png', alt: 'Opcional mayor' },
  { src: '/assets/premio-mayor.png', alt: 'Premio mayor' },
];

export default function Slider() {
  return (
    <Splide
      options={{
        type: 'loop',
        perPage: 1,
        autoplay: true,
        pagination: true,
        arrows: true,
      }}
      aria-label="Imagenes del slider"
    >
      {slides.map(({ src, alt }, index) => (
        <SplideSlide key={index}>
          <img
            src={src}
            alt={alt}
            className="w-full h-auto object-contain rounded-lg"
          />
        </SplideSlide>
      ))}
    </Splide>
  );
}

