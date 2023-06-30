interface IsWish {
  id: string | number;
  title: string;
  text: string;
  editOpen: boolean;
  toggleEdit: () => void;
  edit: (a: string, b: string) => void;
}

export default IsWish;