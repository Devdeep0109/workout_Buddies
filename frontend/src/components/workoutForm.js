import {useState} from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";


const WorkoutForm = () =>{
    const {dispatch} = useWorkoutsContext();
    const [ title , setTitle] =useState('');
    const [ reps , setReps] =useState('');
    const [ load , setLoad] =useState('');
    const [ error , setError] =useState(null);
    const [emptyFields ,setEmptyField] = useState([]);

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const workout = {title,reps,load};

        const response = await fetch('/api/workouts' ,{
            method:'POST',
            body: JSON.stringify(workout),  // these convert object to json file
            headers:{
                'content-Type' :'application/json'
            }
        })
        const json = await response.json();

        if(!response.ok){
            setError(json.error);
            setEmptyField(json.emptyFields)
        }
        if (response.ok) {
            setError(null)
            setTitle('')
            setLoad('')
            setReps('')
            setEmptyField([])
            console.log('new workout added:', json)
            dispatch({type:'CREATE_WORKOUT' ,payload:json})
          }
    }

    return(
        <form  className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label htmlFor="">Exercise Title:</label> 
            <input 
            type="text" 
            onChange={(e) =>{setTitle(e.target.value)}}  
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label htmlFor="">Exercise Repeatation</label> 
            <input 
            type="number" 
            onChange={(e) =>{setReps(e.target.value)}}  
            value={reps}
            className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <label htmlFor=""> Load in (kg) :</label> 
            <input 
            type="number" 
            onChange={(e) =>{setLoad(e.target.value)}}  
            value={load}
            className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add </button>

            {error && <div className="error">{error}</div>}
        </form>
    )
}
export default WorkoutForm;