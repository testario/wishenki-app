export type WishEditModel = {
  title: string,
  text: string,
};
export interface IsWish {
  id: string | number;
  title: string;
  text: string;
  editOpen: boolean;
  toggleEdit: (a?: WishEditModel) => void;
  edit: (a: WishEditModel) => void;
}