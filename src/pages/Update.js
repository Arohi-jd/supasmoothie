import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [method, setMethod] = useState("")
  const [rating, setRating] = useState("")
  const [formError, setFormError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .eq('id', id)
        .single()

      if (error || !data) {
        navigate("/", { replace: true })
        return
      }

      setTitle(data.title)
      setMethod(data.method)
      setRating(data.rating)
      setIsLoading(false)
    }

    fetchSmoothie()
  }, [id, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!title || !method || !rating) {
      setFormError("Please fill in all fields.")
      return
    }

    setIsSubmitting(true)

    const { error } = await supabase
      .from('smoothies')
      .update({ title, method, rating: Number(rating) })
      .eq('id', id)

    if (error) {
      setFormError("Could not update smoothie.")
      setIsSubmitting(false)
      return
    }

    setFormError(null)
    setIsSubmitting(false)
    navigate("/")
  }

  if (isLoading) {
    return (
      <div className="page update">
        <p>Loading smoothie...</p>
      </div>
    )
  }

  return (
    <div className="page update">
      <h2>Update Smoothie</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(event) => setMethod(event.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          id="rating"
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={(event) => setRating(event.target.value)}
        />

        <button disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Smoothie"}
        </button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update