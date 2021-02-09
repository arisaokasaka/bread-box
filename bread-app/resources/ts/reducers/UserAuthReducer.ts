export type StateType = {
    uuid: string;
    auth: string;
};
  
export type ActionType = {
    type: string;
    payload: string;
};

export const UserAuthReducer:any = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'setUser':
            return {
                ...state,
                uuid: action.payload,
                auth: "user"
            };

        case 'setStore':
            return {
                ...state,
                uuid: action.payload,
                auth: "store"
            };
                
        case 'setOut':
            return {
                ...state,
                uuid: null,
                auth: null
            };

        default:
            return {
                state
            };
    }
}
 
export const initialState = {uuid: null, auth: null};