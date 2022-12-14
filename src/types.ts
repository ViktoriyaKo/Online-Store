export interface Templates {
  [keys: string]: TemplateFunc;
}
export interface Routes {
  [keys: string]: TemplateFunc;
}
export type TemplateFunc = () => void;
