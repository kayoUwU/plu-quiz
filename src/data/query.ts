import { Plu } from "@/entity/plu";
import { BASE_PATH } from "@/lib/constant";

export async function getQuestionBank() : Promise<Plu[]> {
  const response = await fetch(BASE_PATH.concat("/pluData.json"), {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const jsonObj = await response.json();
  const result: Plu[] = [];
  for (const data of jsonObj) {
    const item = new Plu();
    result.push({ ...item, ...data });
  }
  return result;
}
