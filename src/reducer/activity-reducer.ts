import type { Activity } from "../types"

export type ActivityAction = 
{type: 'save-activity', payload:{newActivity: Activity}}|
{type: 'active-id', payload:{id:Activity['id']}}|
{type: 'delete-activity', payload:{id:Activity['id']}}|
{type: 'clear-activity'}

const initialValue = (): Activity[] => {
    const localData = localStorage.getItem('activity')
    return localData ? JSON.parse(localData) : []
    
}


export type ActivityState = {
    activity : Activity[],
    activeId : Activity['id']
}

export const intialState : ActivityState = {
    activity: initialValue(),
    activeId : ''
}

export const activityReducer = (
    
    state: ActivityState = intialState,
    action: ActivityAction
) => {

    if(action.type === 'save-activity'){

        let updatedActivity : Activity[] = []
        if(state.activeId){
            updatedActivity = state.activity.map(activity => activity.id === state.activeId ? action.payload.newActivity :
                activity
            )
            return{
                ...state,
                activity: updatedActivity
            }
        }

        else{

            updatedActivity = [...state.activity, action.payload.newActivity]

            return{
                ...state,
                activity: updatedActivity
            }
            
        }
    }

   if(action.type === 'active-id'){

    return{
        ...state,
        activeId: action.payload.id
    }
   }

   if(action.type === 'delete-activity'){
    let updatedActivity = state.activity.filter(act => act.id !== action.payload.id)

    return{
        ...state,
        activity: updatedActivity
    }

   }
   if(action.type === 'clear-activity'){

    return{
        ...state,
        activity: []
    }
   }

    return state

}