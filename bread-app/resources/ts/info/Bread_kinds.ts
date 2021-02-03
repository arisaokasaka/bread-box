class Bread_kinds {

    bread_kinds: any;
    
    constructor() {
        this.bread_kinds = [
            {
                name: "食パン",
                id: "bread_kind_1"
            },
            {
                name: "菓子パン",
                id: "bread_kind_2"
            },
            {
                name: "惣菜パン",
                id: "bread_kind_3"
            },
            {
                name: "フランスパン",
                id: "bread_kind_4"
            },
            {
                name: "サンドイッチ",
                id: "bread_kind_5"
            },
            {
                name: "その他",
                id: "bread_kind_6"
            }
        ];
    }
}

const bread_kinds = new Bread_kinds;
export default bread_kinds;