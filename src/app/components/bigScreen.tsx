import { useState } from "react";
import { Movie } from "../page";
import { BASE_IMAGE_URL } from "../constants";

type NowPlayingMovieProps = {
  nowPlaying: Movie[];
};

export function NowPlaying({ nowPlaying }: NowPlayingMovieProps) {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % nowPlaying.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + nowPlaying.length) % nowPlaying.length);

  return (
    <div className="relative min-w-[500px] w-full h-[400px] md:max-w-[900px] md:h-[500px] mx-auto overflow-hidden">
      {/* Image List */}
      <ul
        className="flex transition-transform duration-500 ease-in-out w-full h-full"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {nowPlaying.map((each) => (
          <li className="w-full h-full flex-shrink-0" key={each.id}>
            <img
              className="w-full h-auto object-cover rounded-2xl"
              src={`${BASE_IMAGE_URL}w1280${each.backdrop_path}`}
              alt={each.title}
            />
          </li>
        ))}
      </ul>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
      >
        ›
      </button>
    </div>
  );
}