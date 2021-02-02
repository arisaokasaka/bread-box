class Hours {
    
    hours: any;
    
    constructor() {
        this.hours = [
            {
                name: "現在営業中",
                id: "hours_1"
            },
            {
                name: "朝9時までにオープン",
                id: "hours_2"
            },
            {
                name:  "19時以降も営業",
                id: "hours_3"
            }
        ];
    }
}

const hours = new Hours;
export default hours;