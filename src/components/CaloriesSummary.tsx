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
        <div className='md:flex md:flex-row flex-col justify-between space-y-10 text-center max-w-4xl mx-auto py-14 px-10 md:space-y-0'>
            
            
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
