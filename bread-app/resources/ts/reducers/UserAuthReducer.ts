export type StateType = {
    uuid: string;
};
  
export type ActionType = {
    type: string;
    payload: string;
};

export const UserAuthReducer:any = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'setId':
            return {
                ...state,
                uuid: action.payload
            };

        case 'setOutId':
            return {
                ...state,
                uuid: null
            };
            
        default:
            return {
                state
            };
    }
}
 
export const initialState = {uuid: null};