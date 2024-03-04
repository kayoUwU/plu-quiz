import { ResultStatus } from "./enum/resultStatus";

export class Plu {
    id: number;
    plu: string;
    name: string;
    image: string;
    quizResult: ResultStatus.Status;

    constructor() {
        this.id = -1;
        this.plu = "plu";
        this.name = "name";
        this.image = "";
        this.quizResult = ResultStatus.Status.IN_QUENE;
    }
}