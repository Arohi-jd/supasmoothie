import { Link } from "react-router-dom"
import supabase from "../config/supabaseClient"

const SmoothieCard = ({ smoothie }) => {
    const handleDelete = async () => {
        const { error } = await supabase
            .from('smoothies')
            .delete()
            .eq('id', smoothie.id)

        if (!error) {
            window.location.reload()
        }
    }

    return (
        <div className="smoothie-card">
            <h3>{smoothie.title}</h3>
            <p>{smoothie.method}</p>
            <div className="rating">{smoothie.rating}</div>
            <div className="actions">
                <Link to={`/smoothies/${smoothie.id}`}>Edit</Link>
                <button type="button" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default SmoothieCard