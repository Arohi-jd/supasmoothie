import supabase from "../config/supabaseClient"
import { useEffect, useMemo, useState } from "react"
import SmoothieCard from "../components/smoothieCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState("created_at")

  useEffect(() => {
    const fetchSmoothies = async () => {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('smoothies')
        .select()

      if (error) {
        setFetchError('Could not fetch smoothies. Please refresh and try again.')
        setSmoothies([])
        setIsLoading(false)
        return
      }

      setSmoothies(data ?? [])
      setFetchError(null)
      setIsLoading(false)
    }

    fetchSmoothies()
  }, [])

  const sortedSmoothies = useMemo(() => {
    const copy = [...smoothies]

    if (sortBy === "rating") {
      return copy.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    }

    if (sortBy === "title") {
      return copy.sort((a, b) => (a.title ?? "").localeCompare(b.title ?? ""))
    }

    return copy.sort((a, b) => {
      const left = a.created_at ? new Date(a.created_at).getTime() : 0
      const right = b.created_at ? new Date(b.created_at).getTime() : 0
      return right - left
    })
  }, [smoothies, sortBy])

  return (
    <div className="page home">
      <div className="home-controls">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="created_at">Newest</option>
          <option value="rating">Rating</option>
          <option value="title">Title</option>
        </select>
      </div>

      {isLoading && <p>Loading smoothies...</p>}
      {fetchError && <p className="error">{fetchError}</p>}
      {!isLoading && !fetchError && sortedSmoothies.length === 0 && <p>No smoothies found.</p>}

      {!isLoading && sortedSmoothies.length > 0 && (
        <div className="smoothies">
          {sortedSmoothies.map((smoothie) => (
            <SmoothieCard key={smoothie.id} smoothie={smoothie} />
          ))}
        </div>
      ) }
    </div>
  )
}

export default Home