import MovieGrid from "@/components/movie-grid"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function Home(){

  return (
    <div>
      <section className="relative h-[500px] flex items-center justify-center bg-gradient-to-r from-black to-gray-800 text-white">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to MovieFlix</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Discover the latest movies, read reviews, and stay updated with the world of cinema.
          </p>
             <Button asChild size="lg" className="bg-red-600">
      <Link href="/movies">Explore Movies</Link>
    </Button>
        </div>
      </section>
      <section className="pt-6">
        <div>
          <h2 className="text-3xl font-bold mb-6 ml-12">Featured Movies</h2>
          <MovieGrid />
        </div>
      </section>
    </div>
  )
}

