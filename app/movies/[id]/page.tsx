import Image from "next/image"
import WatchTrailer from "../../../components/watchtrailer"
import { Calendar, Clock, Star } from "lucide-react"
import Link from "next/link"


interface Provider {
  provider_id: number
  provider_name: string
  logo_path: string
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params
  const TMDB_API_KEY = "7d2cf79eb5770a2238f554381dbd7f0f"
  const movieId = Number.parseInt(id)

  const movieData = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`)
  const movie = await movieData.json()

  const recommendationsData = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${TMDB_API_KEY}&language=en-US`,
  )
  const recommendations = await recommendationsData.json()

  const videoData = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`,
  )
  const videos = await videoData.json()
  const trailer = videos.results.find((video: any) => video.type === "Trailer")

  const watchProvidersData = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${TMDB_API_KEY}`,
  )
  const watchProviders = await watchProvidersData.json()
  const providers = watchProviders.results?.US?.flatrate || []

  return (
    <div>
      <div className="relative h-[400px] w-full">
        <Image
          src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : "/image/default.jpg"}
          alt={movie.title}
          fill
          sizes="100vw"
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="container px-4 -mt-32 relative">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <Image
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/image/default.jpg"}
            width={500}
            height={750}
            alt={movie.title || "Movie poster"}
          />
          <div className="text-black md:pt-32">
            <h1 className="text-4xl font-bold mb-4">{movie.original_title}</h1>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{movie.release_date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{movie.runtime} min</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>{movie.vote_average}/10</span>
              </div>
            </div>
            <p className="text-lg mb-6">{movie.overview}</p>
            {trailer && <WatchTrailer youtubeKey={trailer.key} />}
            {providers.length > 0 && (
              <div className="mt-4 text-black">
                <h2 className="text-xl font-semibold">Available On:</h2>
                <div className="flex gap-4 mt-2">
                  {providers.map((provider: Provider) => (
                    <Image
                      key={provider.provider_id}
                      src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                      alt={provider.provider_name}
                      width={50}
                      height={50}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {recommendations.results.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-black mb-4">Recommended Movies</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recommendations.results.slice(0, 4).map((recMovie: any) => (
                <Link key={recMovie.id} href={`/movies/${recMovie.id}`}>
                  <div className="relative h-56 w-full cursor-pointer">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${recMovie.poster_path}`}
                      alt={recMovie.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 bg-black/60 text-white p-2 w-full text-center">
                      <h3 className="text-sm font-semibold">{recMovie.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

