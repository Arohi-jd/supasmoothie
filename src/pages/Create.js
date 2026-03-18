import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Create = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [method, setMethod] = useState("")
  const [rating, setRating] = useState("")
  const [formError, setFormError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!title || !method || !rating) {
      setFormError("Please fill in all fields.")
      return
    }

    setIsSubmitting(true)

    const { error } = await supabase
      .from('smoothies')
      .insert([{ title, method, rating: Number(rating) }])

    if (error) {
      setFormError("Could not create smoothie.")
      setIsSubmitting(false)
      return
    }

    setFormError(null)
    setIsSubmitting(false)
    navigate("/")
  }

  return (
    <div className="page create">
      <h2>Add a New Smoothie</h2>
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
          {isSubmitting ? "Saving..." : "Create Smoothie"}
        </button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create