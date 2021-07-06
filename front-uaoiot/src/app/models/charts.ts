export class Charts {
    constructor(
        public id,
        public project: String,
        public user: String,
        public type: String,
        public datas: [any],
        public labels: [any],
        public title: String
    ) { }
}
