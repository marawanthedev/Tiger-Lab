export interface InputField {
  name: string;
  label: string;
  placholder: string;
  type?: string;
  [rest: string]: any;
}
