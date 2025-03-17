'use client'

import { useEffect, useState } from "react";
import { ACCESS_TOKEN, BASE_URL, BASE_IMAGE_URL, API_KEY } from "./constants";
import axios from "axios";

import { UpcomingMovies } from "./components/upcoming";
import { Header } from "./components/header";
import { NowPlaying } from "./components/bigScreen";
import { SelectedMovies } from "./components/selectedMovies";


export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};


export default function Home() {
  const [upComingMovies, setUpComingMovies] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([])
  const [selectedGenre, setSelectedGenre] = useState<{ id: number; name: string } | null>(null)
  const [selectedMoviesList, setSelectedMoviesList] = useState<Movie[]>([])
  const [searchValue, setSearchValue] = useState<string>("")
  const [searchedMovieListInput, setSearchedMovieListInput] = useState<Movie[]>([])
  const [currentPageNumber, setCurrentPageNumber] = useState(1)

  useEffect(() => {
    // Now PLaying
    const options = {
      method: 'GET',
      url: `${BASE_URL}/movie/now_playing`,
      params: { language: 'en-US', page: currentPageNumber },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    };

    axios
      .request(options)
      .then(res => setNowPlaying(res.data.results))
      .catch(err => console.error(err));
  }, [])

  //UPCOMING FETCH
  useEffect(() => {
    let isMounted = true;
    const getMovies = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/movie/upcoming`, {
          params: { language: "en-US", page: currentPageNumber },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`

          },
        });
        if (isMounted) {
          // console.log(res.data)
          setUpComingMovies(res.data.results)
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    getMovies();
    return () => { isMounted = false; };
  }, [currentPageNumber]);

  //GENRE FETCH
  useEffect(() => {
    const getMovieByGenre = async () => {
      if (!selectedGenre) return;
      const res = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre.id}`)
      const results = res.data.results;
      setSelectedMoviesList(results)

    }
    getMovieByGenre()
  }, [selectedGenre])
  
  //SEARCH FETCH
  useEffect(() => {
    const getMovieBySearch = async () => {
      if (!searchValue) return;
      const res = await axios.get(`${BASE_URL}/search/movie?query=${searchValue}&api_key=${API_KEY}`)
      const searchedMovies = res.data.results
      setSearchedMovieListInput(searchedMovies)

    }
    getMovieBySearch()
  }, [searchValue])

  const HandlePrevButton = () => setCurrentPageNumber((prev) => Math.max(1, prev - 1));
  const HandleNextButton = () => setCurrentPageNumber((prev) => prev + 1);
  return (
    <div className="">

      <Header
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        searchValue={searchValue}
        setSearchValue={setSearchValue} ></Header>
      <NowPlaying nowPlaying={nowPlaying}></NowPlaying>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={HandlePrevButton}
          disabled={currentPageNumber === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPageNumber}</span>
        <button
          onClick={HandleNextButton}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
      {
        searchValue && searchValue.length > 0 ?
          (<SelectedMovies searchedMovieListInput={searchedMovieListInput} setSearchedMovieListInput={setSearchedMovieListInput} />) :
          selectedMoviesList && selectedMoviesList.length > 0 ? <div>Genre list</div>
            :
            (<UpcomingMovies upComingMovies={upComingMovies} selectedGenre={selectedGenre}></UpcomingMovies>)
      }

    </div>
  );
}
