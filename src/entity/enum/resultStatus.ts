import { ResultDisplay } from "../resultDisplay";

export namespace ResultStatus {
    export enum Status {
        IN_QUENE,
        SKIP,
        CORRECT,
        WRONG,
    };

    const ResultStatusDisplay: { [key in Status]: ResultDisplay } = {
        [Status.IN_QUENE]: {text:'',color:''},
        [Status.SKIP]: {text:'Skip',color:'text-yellow-500'},
        [Status.CORRECT]: {text:'Correct',color:'text-green-500'},
        [Status.WRONG]: {text:'Wrong',color:'text-red-500'},
    };
    
    export function display(status: keyof typeof ResultStatusDisplay) {
        return ResultStatusDisplay[status];
    }
}