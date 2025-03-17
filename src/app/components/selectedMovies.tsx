import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Movie } from "../page";
import { BASE_IMAGE_URL } from "../constants";
import Link from "next/link";

type SearchedMovieListInputProps = {
    searchedMovieListInput: Movie[];
    setSearchedMovieListInput: (movies: Movie[]) => void;
};

export function SelectedMovies({ searchedMovieListInput, setSearchedMovieListInput }: SearchedMovieListInputProps) {
    console.log(searchedMovieListInput);

    return (
        <div>
            {searchedMovieListInput.map((each) => <Link key={each.id} href={`/movieDetail/${each.id}`}><div >{each.title}
                <img src={`${BASE_IMAGE_URL}/w500${each.poster_path}`} alt="" className="w-50 h-50" />
            </div></Link>)}
        </div>
    )
}