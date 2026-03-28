export interface Country {
  name: string;
  code: string;
  emoji: string;
}

export interface CustomInputProps {
  label: string;
  name: string;
  type: "text" | "date" | "tel" | "email" | "nationality";
  placeholder: string;
}
