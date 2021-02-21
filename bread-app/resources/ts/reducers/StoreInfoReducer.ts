export type StateType = {
    storeInfo: {data:[]};
    menuInfo: {data:[]};
};
  
export type ActionType = {
    type: string;
    payload: any;
};

export const StoreInfoReducer:any= (stateInfo: StateType, action: ActionType) => {
    switch (action.type) {
        case 'inputStoreInfo':
            return{
                ...stateInfo,
                storeInfo: action.payload
            }

        case 'inputMenuInfo':
            return{
                ...stateInfo,
                menuInfo: action.payload
            }

        default:
            return {
                stateInfo
            };
    }
}
 
export const initialState = {storeInfo: null, menuInfo: null};