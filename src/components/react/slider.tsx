import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';

interface Slide {
  src: string;
  alt: string;
}

const slides = [
  { src: '/assets/anticipados.webp', alt: 'Anticipados' },
  { src: '/assets/cuota-inicial-mas-adicionales.webp', alt: 'Cuota inicial' },
  { src: '/assets/opcional-al-mayor.webp', alt: 'Opcional mayor' },
  { src: '/assets/premio-mayor.webp', alt: 'Premio mayor' },
];

export default function Slider() {
  return (
    <Splide
      options={{
        type: 'loop',
        perPage: 1,
        autoplay: true,
        interval: 3000,
        resetProgress: false,
        pagination: true,
        arrows: false,
        accesibility: false,
      }}
      aria-label="Imagenes del slider"
    >
      {slides.map(({ src, alt }, index) => (
        <SplideSlide key={index}>
          <img
            src={src}
            alt={alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : undefined}
            className="w-full h-auto object-contain"
          />
        </SplideSlide>
      ))}
    </Splide>
  );
}