import { useMemo } from "react"
import { Activity } from "../types"
import CaloriesDisplay from "./CaloriesDisplay"
type CaloriesSummaryProps = {
    activity: Activity[]
}

export default function CaloriesSummary({activity} : CaloriesSummaryProps) {

    const caloriesConsumed = useMemo(() => activity.reduce((total, act) => act.category === 1? total + act.calories : total, 0) , [activity])
    const caloriesBurned = useMemo(() => activity.reduce((total, act) => act.category === 2? total + act.calories : total, 0) , [activity])
    const caloriesDifference = useMemo(() => caloriesConsumed - caloriesBurned, [activity])
    return (
    <>
    <div className='bg-green-100'>
        <div className='md:flex md:flex-row flex-col justify-between text-center items-center py-14 md:px-96 space-y-14 md:space-x-0'>
            
            
            <CaloriesDisplay
            calories = {caloriesConsumed}
            text = {'Consumed'}/>
            
            <CaloriesDisplay
            calories = {caloriesBurned}
            text = {'Exercise'}/>

            <CaloriesDisplay
            calories = {caloriesDifference}
            text = {'Difference'}/>
            

        </div>
    </div>
    </>
  )
}
