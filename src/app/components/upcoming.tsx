'use client'
import { useRouter } from "next/navigation";
import { BASE_IMAGE_URL } from "../constants";
import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Movie } from "../page";
import Link from "next/link";

type UpcomingMoviesProps = {
    upComingMovies: Movie[];
    selectedGenre: { id: number; name: string } | null;
};

export function UpcomingMovies({ upComingMovies, selectedGenre }: UpcomingMoviesProps) {
    const router = useRouter();
    const generateSlug = (title: string, id: number) => {
        return `${title.toLowerCase().replace(/\s+/g, "-")}-${id}`; 
    };

    const HandleClickMovie = (each: { id: number, title: string }) => {
        const slug = generateSlug(each.title, each.id);
    };

    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 p-4 bg-slate-900">
            {upComingMovies?.map((each) => (
                <Link  key={each.id} href={`/movieDetail/${each.id}`}>
                <Card className="w-[100%] h-auto cursor-pointer" onClick={() => HandleClickMovie(each)}>
                    <CardHeader>
                        <CardTitle>{each.title}</CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <img src={`${BASE_IMAGE_URL}w500${each.poster_path}`} alt="upcomingmovie" />
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card></Link>
            ))}
        </div>
    );
}