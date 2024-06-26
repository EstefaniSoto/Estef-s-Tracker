import { useEffect, useReducer, useMemo } from "react"
import Form from "./components/Form"
import { activityReducer, intialState } from "./reducer/activity-reducer"
import ActivityList from "./components/ActivityList"
import CaloriesSummary from "./components/CaloriesSummary"
import {ArrowPathIcon} from '@heroicons/react/24/solid'

function App() {
 
  const [state, dispatch] = useReducer(activityReducer, intialState)


  useEffect(() => {
    localStorage.setItem('activity', JSON.stringify(state.activity))

  }, [state.activity])
  
  const canReload = () => useMemo(() => state.activity.length, [state.activity])
  

  return (
    <>
    <header className="flex justify-between md:py-5 md:px-8 bg-green-100 items-center mb-10">
      <img src="/img/3.png" className="w-40 hidden md:block" alt="" />
      <img src="/img/2.png" className="w-36 block md:hidden"  alt="" />
      <button
        className="md:bg-green-900 py-6 px-10 h-10 flex items-center text-white text-center rounded-lg disabled:opacity-10"
        onClick={() => dispatch({ type: 'clear-activity' })}
        disabled={!canReload()}
      >
        <span className="hidden md:block">Reload</span>
        <ArrowPathIcon
        className="h-12 w-12 text-green-900 block md:hidden"/>
      </button>
    </header>

     
     
     <section>
      
      <div>
        <div className="max-w-4xl md:mx-auto">
        <Form
        dispatch = {dispatch}
        state = {state}/></div>

        <div className="my-10">
          <CaloriesSummary
        activity = {state.activity}/>
        </div>
        
      </div>



      <div className="mx-auto max-w-4xl space-y-10">

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
