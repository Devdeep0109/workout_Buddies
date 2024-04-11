import { useEffect} from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from "../components/workoutDetails";
import WorkoutForm from "../components/workoutForm";

const Home = () =>{

    const {workouts ,dispatch} = useWorkoutsContext();

    // to get data from backend

    useEffect( ()=>{
        const fetchWorkouts = async() =>{
            const response = await fetch('/api/workouts');
            const json  =await response.json(); //converting json to array of objects
            console.log(json);
            if(response.ok){
                dispatch({type:'SET_WORKOUTS' ,payload :json} )
            }
        }
        // calling fetchWorkouts function
        fetchWorkouts();
    },[])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map(workout => (
                    <WorkoutDetails props={workout} key={workout._id} />
                ))}
            </div>
            <WorkoutForm />
        </div>   
    )
}
export default Home;