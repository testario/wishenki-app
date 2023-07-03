import { IsWish, WishEditModel } from "@/interfaces/IsWish";

export class Wish implements IsWish {
  constructor(
    readonly id: string | number,
    public title: string,
    public text: string,
    public editOpen: boolean,
  ){
    this.id = id;
    this.title = title;
    this.text = text;
    this.editOpen = editOpen;
  }
  edit(editModel: WishEditModel): void {
    if (editModel.title.length && editModel.text.length) {
      this.title = editModel.title;
      this.text = editModel.text;
      this.editOpen = false;
    }
  }
  toggleEdit(editModel?: WishEditModel): void {
    if (typeof editModel !== "undefined") {
      editModel.title = this.title;
      editModel.text = this.text;
    }
    this.editOpen = !this.editOpen;
  }
}