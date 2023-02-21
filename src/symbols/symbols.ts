import { InjectionKey, Ref } from "vue";
import { PDFBody } from "../models/pdf/body/PDFBody";
import { PDFPage } from "../models/pdf/page/PDFPage";

export const IPDFObject: InjectionKey<Ref<PDFBody>> = Symbol("IPDFObject");
export const ISelectedPage: InjectionKey<Ref<PDFPage | null>> = Symbol("ISelectedPage");