"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Movie {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
  release_date: string
  genre_ids: number[]
}

interface Genre {
  id: number
  name: string
}

export default function MovieGrid() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      const TMDB_API_KEY = "7d2cf79eb5770a2238f554381dbd7f0f"
      const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`

      try {
        const [moviesRes, genresRes] = await Promise.all([
          fetch(API_URL),
          fetch(GENRE_URL),
        ])

        if (!moviesRes.ok || !genresRes.ok) {
          throw new Error("Failed to fetch data")
        }

        const moviesData = await moviesRes.json()
        const genresData = await genresRes.json()

        setMovies(moviesData.results || [])
        setGenres(genresData.genres || [])
      } catch (error) {
        console.error("Error fetching movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  const filteredMovies = movies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGenre ? movie.genre_ids.includes(Number(selectedGenre)) : true) &&
      (selectedYear ? movie.release_date.startsWith(selectedYear) : true)
    )
  })

  return (
    <div className="lg:p-12 -mt-8">
<div className="flex flex-col sm:flex-row gap-4 mb-6 justify-end items-stretch sm:items-center pt-4">
  <input
    type="text"
    placeholder="Search movies..."
    className="p-2 border rounded w-full sm:w-96"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <select
    className="p-2 border rounded w-full sm:w-auto"
    value={selectedGenre}
    onChange={(e) => setSelectedGenre(e.target.value)}
  >
    <option value="">All Genres</option>
    {genres.map((genre) => (
      <option key={genre.id} value={genre.id}>
        {genre.name}
      </option>
    ))}
  </select>
  <select
    className="p-2 border rounded w-full sm:w-auto"
    value={selectedYear}
    onChange={(e) => setSelectedYear(e.target.value)}
  >
    <option value="">All Years</option>
    {Array.from(new Set(movies.map((m) => m.release_date.split("-")[0])))
      .sort()
      .map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
  </select>
</div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-[450px] w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <Link key={movie.id} href={`/movies/${movie.id}`}>
                <Card className="overflow-hidden hover:scale-105 transition-transform duration-200">
                  <CardContent className="p-0">
                    <div className="relative aspect-[2/3]">
                      <Image
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "/default-image.jpg"
                        }
                        alt={movie.title || "Movie poster"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold truncate">{movie.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Rating: {movie.vote_average.toFixed(1)}/10
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-4 text-red-500">No movies found!</p>
          )}
        </div>
      )}
    </div>
  )
}
