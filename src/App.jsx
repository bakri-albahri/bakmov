import { useEffect, useState } from "react"
import Search from "./components/Search"
import { Axios } from "./api/axios"
import { popularDESC, SEARCH } from "./api/api"
import Spinner from "./components/Spinner"
import MovieCard from "./components/MovieCard"
import { useDebounce } from "react-use"
import { getTrendingMovies, updateSearchCount } from "./appwrite"

function App() {
  const [searchTerm , setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList, setMovieList] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  useDebounce(() => setDebouncedSearchTerm(searchTerm) , 500 , [searchTerm])
  
  const getMovies = async (query) => {
    setIsLoading(true)
    setErrorMessage("")
    try{
      const res = await Axios.get(query ? `${SEARCH}${encodeURIComponent(query)}` : `${popularDESC}`)
      if(res.status === 200){
        setMovieList(res.data.results)
        if(query && res.data.results.length > 0){
            await updateSearchCount(query , res.data.results[0])
        }
      }else{
        setErrorMessage('Failed to fetch movies')
        setMovieList([])
        return;
      }
    }catch (error){
      console.error(`Error Fetching movies: ${error}`)
      setErrorMessage("Error fetching Moviws. Please try again later.")
    }finally{
      setIsLoading(false)
    }
  }

  const showTrendingMovies = async () => {
    try{
      const movies = await getTrendingMovies();
      setTrendingMovies(movies)
    }catch(error){
      console.error(`Error Fetching trending movies: ${error}`)
    }
  }
  
  useEffect(() => {
    getMovies(debouncedSearchTerm);
  },[debouncedSearchTerm])

  useEffect(() => {
    showTrendingMovies()
  },[ ])
  

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">

        <header>
          <img src="/bakmov/hero.png" alt="hero" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without The Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie , index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>
          {
            isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie}/>
                ))}
              </ul>
            )
          }
        </section>

      </div>
    </main>
  )
}

export default App
