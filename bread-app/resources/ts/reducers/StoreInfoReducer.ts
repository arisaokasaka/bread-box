import axios from 'axios';

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
        // case 'indexStore':
        //     console.log('indexStore')
        //     axios.post("/api/index_storeInfo", action.payload)
        //     .then(res => {
        //         console.log(res);
        //         return {
        //             ...stateInfo,
        //             storeInfo: res.data,
        //         }
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })

        // case 'indexMenu':
        //     console.log('indexMenu')
        //     axios.post("/api/index_menuInfo", action.payload)
        //     .then(res => {
        //         console.log(res);
        //         return {
        //             ...stateInfo,
        //             menuInfo: res.data,
        //         }
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })

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