import {Plu} from '@/entity/plu';
import {PLU_DATA} from '@/data/pluData';
import {BASE_PATH} from '@/lib/constant';

export function getQuestionBank():Plu[]  {
    const result:Plu[] = [];
    for(const data of PLU_DATA){
        result.push({...data, quizResult:null});
    }
    return result;
};

export const IMAGE_PATH_PREFIX = BASE_PATH.concat("/plu_img/");