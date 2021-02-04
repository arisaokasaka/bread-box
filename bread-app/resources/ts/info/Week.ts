class Week {

    week: any;
      
    constructor() {
        this.week = [
            {
                id: "monday",
                name: "月曜日",
                text: "月",
                class: "i-monday",
                boolean: false,
            },
            {
                id: "tuesday",
                name: "火曜日",
                text: "火",
                class: "i-tuesday"
            },
            {
                id: "wednesday",
                name: "水曜日",
                text: "水",
                class: "i-wednesday"
            },
            {
                id: "thursday",
                name: "木曜日",
                text: "木",
                class: "i-thursday"
            },
            {
                id: "friday",
                name: "金曜日",
                text: "金",
                class: "i-friday"
            },
            {
                id: "saturday",
                name: "土曜日",
                text: "土",
                class: "i-saturday"
            },
            {
                id: "sunday",
                name: "日曜日",
                text: "日",
                class: "i-sunday"
            },
        ];
    }
}

const week = new Week;
export default week;