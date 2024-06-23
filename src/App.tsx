import { useEffect, useReducer, useMemo } from "react"
import Form from "./components/Form"
import { activityReducer, intialState } from "./reducer/activity-reducer"
import ActivityList from "./components/ActivityList"
import CaloriesSummary from "./components/CaloriesSummary"

function App() {
 
  const [state, dispatch] = useReducer(activityReducer, intialState)


  useEffect(() => {
    localStorage.setItem('activity', JSON.stringify(state.activity))

  }, [state.activity])
  
  const canReload = () => useMemo(() => state.activity.length, [state.activity])
  

  return (
    <>
    <header className="flex justify-between py-5 px-8 bg-green-100 items-center mb-10">
      <img src="/img/3.png" 
      className ="w-40"
      alt="" />
      <button className="bg-green-900 py-6 px-10 h-10 flex items-center text-white text-center rounded-lg disabled:opacity-10"
      onClick={() => dispatch({type: 'clear-activity'})}
      disabled = {!canReload()}>Reload</button>
    </header>

     
     
     <section>
      
      <div>
        <div className="max-w-4xl md:mx-auto mx-5">
        <Form
        dispatch = {dispatch}
        state = {state}/></div>

        <div className="my-10">
          <CaloriesSummary
        activity = {state.activity}/>
        </div>
        
      </div>



      <div className="flex flex-col gap-5 items-center ">

        <ActivityList
        activity = {state.activity}
        dispatch = {dispatch}/>
        
      </div>
     </section>

     <footer className="bg-green-100 flex justify-center mt-10 p-10">
      <img src="/img/1.png" alt="" 
      className="w-40"/>
     </footer>
     
    </>
  )
}

export default App
