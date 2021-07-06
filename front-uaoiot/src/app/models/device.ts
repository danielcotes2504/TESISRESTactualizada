export class Device {
    constructor(
        public id: String,
        public name: String,
        public user: String,
        public project: String,
        public projectId: String,
        public variables: [any]
    ) { }
}
