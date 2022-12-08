import Image from "next/image";
import { useEffect, useState } from "react";
import { baseUrl } from "../constants/movie";
import { Movie } from "../typings";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";

interface Props {
  netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
  //   console.log("netflixOriginals", netflixOriginals);

  const [movie, setMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  // console.log(movie);

  useEffect(() => {
    //Get Randem Index
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)] //<-- chech the workflow
    );
  }, []);
  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      {/* some Styling issue above or below styles*/}
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        {/* check z-index */}
        {/* Image is a NextJS Component */}
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt=""
          layout="fill" //check
          objectFit="cover" //check
        />
      </div>
      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl ">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl">
        {movie?.overview}
      </p>
      {/* Bottom */}
      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
          Play
        </button>
        {/* use custom tailwind bg color */}
        <button
          onClick={() => {
            setCurrentMovie(movie);
            setShowModal(true);
          }}
          className="bannerButton bg-[gray]/70"
        >
          More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
