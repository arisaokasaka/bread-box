class Week {

    week: any;
      
    constructor() {
        this.week = [
            {
                text: "月",
                class: "i-monday"
            },
            {
                text: "火",
                class: "i-tuesday"
            },
            {
                text: "水",
                class: "i-wednesday"
            },
            {
                text: "木",
                class: "i-thursday"
            },
            {
                text: "金",
                class: "i-friday"
            },
            {
                text: "土",
                class: "i-saturday"
            },
            {
                text: "日",
                class: "i-sunday"
            },
        ];
    }
}

const week = new Week;
export default week;