interface IsWish {
  id: string | number;
  title: string;
  text: string;
  editOpen: boolean;
  toggleEdit: () => void;
  edit: (a: string, b: string) => void;
  getId: () => string | number;
}

export default IsWish;