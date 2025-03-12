'use client'

import { useEffect, useState } from "react";
import { ACCESS_TOKEN, BASE_URL, BASE_IMAGE_URL } from "./constants";
import axios from "axios";

import { UpcomingMovies } from "./components/upcoming";
import { Header } from "./components/header";
import { NowPlaying } from "./components/bigScreen";


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

    useEffect(() => {
  // Now PLaying
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/now_playing',
    params: {language: 'en-US', page: '1'},
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  };
  
  axios
    .request(options)
    .then(res => ( setNowPlaying(res.data.results)))
    .catch(err => console.error(err));

    }, [])

  // UPCOMING MOVIES--
  useEffect(() => {
    let isMounted = true;
    const getMovies = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/movie/upcoming`, {
          params: { language: "en-US", page: "1" },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`
  
          },
        });
        if (isMounted) {
          setUpComingMovies(res.data.results)
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    getMovies();
    return () => { isMounted = false; };
  }, []);


  return (
    <div>
      <Header></Header>
      <NowPlaying nowPlaying={nowPlaying}></NowPlaying>
      <UpcomingMovies upComingMovies={upComingMovies}></UpcomingMovies>
    </div>
  );
}
