
export type NotionColor =
  | "default"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red";

export type Project = {
  id: string;

  name: string;

  state: {
    name: string;
    color: NotionColor;
  };

  responsible: string[];

  areas: {
    name: string;
    color: NotionColor;
  }[];

  description: string;

  imageUrl: string;
};

