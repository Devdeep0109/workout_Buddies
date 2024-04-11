import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ props }) => {

  const {dispatch} =useWorkoutsContext();

  const handleClick = async()=>{

    const response = await fetch('/api/workouts/' + props._id ,{
      method:'DELETE'
    })
    const json = await response.json()

    if(response.ok){
      dispatch({type:'DELETE_WORKOUT' ,payload:json})
    }
  }

    return (

      <div className="workout-details">
        <h4>{props.title}</h4>
        <p><strong>Load (kg): </strong>{props.load}</p>
        <p><strong>Number of reps: </strong>{props.reps}</p>
        <p>{formatDistanceToNow(new Date(props.createdAt), { addSuffix: true })}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>    
      </div>
    )
  }
  
  export default WorkoutDetails