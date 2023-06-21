import { boldElement } from "./bold.mjs";
import { italicElement } from "./italic.mjs";

export function italicBoldElement(first,last,content){
    return italicElement(null,null,boldElement(null,null,content))
}