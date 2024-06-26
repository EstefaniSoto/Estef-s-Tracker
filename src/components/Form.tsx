import { useState, Dispatch, ChangeEvent, FormEvent, useEffect } from 'react'
import { categories } from '../data/categories'
import {v4 as uuid} from 'uuid'
import type { Activity } from '../types'
import { ActivityAction, ActivityState } from '../reducer/activity-reducer'

type FormProps = {
    dispatch: Dispatch<ActivityAction>
    state: ActivityState
}

export default function Form({dispatch, state} : FormProps) {

useEffect(() => {

  if(state.activeId){

    const editActivity = state.activity.filter(activity => activity.id === state.activeId)[0]
    console.log(editActivity)
    setActivity(editActivity)

  }

}, [state.activeId])

    const initialState : Activity = {
        id:uuid(),
        category: 1,
        name: '',
        calories: 0
    }

    const [activity, setActivity] = useState<Activity>(initialState)

     const isValidActivity = () => {
        const {name, calories} = activity
        return name.trim() !== '' && calories > 0  
     }
    
     const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
 
        const activityFiled = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id] : activityFiled ? +e.target.value : e.target.value
        })
     }
     const formSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({type:'save-activity', payload:{newActivity: activity}})
        setActivity({
            ...initialState,
            id: uuid()
        })

        }
  return (
    <>
    <form className='bg-gray-50 rounded-xl p-5 space-y-5 border-gray-800 border-solid border-4 mx-8'
    onSubmit={formSubmit}>
        <div className='grid grid-cols-1 gap-3 '>
            <label htmlFor="category" className='font-bold'>Category:</label>
                <select name="" id="category"
                className='p-2 rounded-lg border-slate-200 border'
                value={activity.category}
                onChange={handleChange}>
                    {categories.map(activity => (
                        <option value={activity.id}
                        key={activity.id}>{activity.name}</option>
                    ))}
                </select>
        </div>

        <div className='grid grid-cols-1 gap-3 '>
            <label htmlFor="name" className='font-bold'>{activity.category === 1? 'Food:' : 'Activity:'}</label>
                <input type="text" className='p-2 rounded-lg border-slate-200 border' id='name'
                placeholder={activity.category === 1? 'Ex. Chocolate, Apple, French Fries...' : 'Ex. Running, jumping, kickboxing...'} value={activity.name}
                onChange={handleChange} />
        </div>

        <div className='grid grid-cols-1 gap-3 '>
            <label htmlFor="calories" className='font-bold'>Calories:</label>
                <input type="number" className='p-2 rounded-lg border-slate-200 border' id='calories' 
                placeholder='Ej. 500 o 600' value={activity.calories}
                onChange={handleChange}/>
        </div>

        <input className='bg-green-900 w-full mt-5 p-2 text-white font-bold text-lg hover:bg-green-950 disabled:opacity-10 text-center'
        disabled = {!isValidActivity()} value={activity.category === 1 ? 'Save Food' : 'Save Exercise'}
        type='submit'/>
    </form>
 


    
    </>
  )
}
