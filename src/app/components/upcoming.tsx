import { BASE_IMAGE_URL } from "../constants";
import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle  } from "@/components/ui/card";
import { Movie } from "../page";

type UpcomingMoviesProps = {
  upComingMovies: Movie[]; 
};


export function UpcomingMovies({ upComingMovies }: UpcomingMoviesProps) {


    const movie1 = (<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 p-4 bg-slate-900 ">
        {upComingMovies?.map((each) => {
            return <Card key={each.id} className="w-[100%] h-auto ">
                <CardHeader>
                    <CardTitle>{each.title}</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                    <img src={`${BASE_IMAGE_URL}w500${each.poster_path}`} alt="" />
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        })}
    </div>
    )
    return (
        <div>{movie1}</div>
    )
}