import { Dispatch, useMemo } from "react"
import type { Activity } from "../types"
import { categories } from "../data/categories"
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/solid'
import { ActivityAction } from "../reducer/activity-reducer"

type ActivityListProps = {
    activity: Activity[]
    dispatch: Dispatch<ActivityAction>
}



export default function ActivityList({activity, dispatch} : ActivityListProps) {

const categoryName = useMemo(() => (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '' ) , [activity])

  return (
    <>
    <h2 className="text-center text-4xl font-bold my-5">Food and Activities</h2>
    {activity.length === 0? <p className="text-center text-2xl">There are no activities.</p> : 
    
    activity.map(act => (

      <div className="bg-white relative md:flex flex-col justify-between gap-3 p-5 md:space-y-0 mx-10 lg:mx-0"
      key={act.id}>
      <div className= { act.category === 1? `bg-lime-400 absolute top-2 py-2 px-8 -left-4 text-white font-bold` : `bg-orange-400 absolute top-2 py-2 px-5 -left-4 text-white font-bold`}>{categoryName(+act.category)}</div>
      <div>
      <p className="pt-10 font-bold text-3xl">{act.name}</p>
      <p className="font-bold text-4xl text-lime-500">{act.calories}{' '} Calories</p>
      </div>
      <div className="flex gap-3">
        <button onClick={() => dispatch({type: 'active-id', payload:{id:act.id}})}>
          <PencilSquareIcon
          className="h-8 w-8 text-gray-700"/>
        </button>

        <button onClick={() => dispatch({type: 'delete-activity', payload:{id:act.id}})}>
          <TrashIcon
          className="h-8 w-8 text-red-600"/>
        </button>
      </div>
  </div>
  ))
    
    
    }
    
    
    
    </>
  )
}
