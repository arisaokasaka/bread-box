class Districts {

    districts: any;
    
    constructor() {
        this.districts = [
            {
                name: "中央区",
                id: "districts_1"
            },
            {
                name: "博多区",
                id: "districts_2"
            },
            {
                name: "西区",
                id: "districts_3"
            }, 
            {
                name: "東区",
                id: "districts_4"
            },
            {
                name: "南区",
                id: "districts_5"
            },
            {
                name: "城南区",
                id: "districts_6"
            },
            {
                name: "早良区",
                id: "districts_7"
            }
        ];
    }
}

const districts = new Districts;
export default districts;