import IsWish from "../interfaces/IsWish.ts";

class Wish implements IsWish {
  constructor(
    readonly id: string | number,
    public title: string,
    public text: string,
    public editOpen: boolean
  ){};
  edit(title: string, text: string): void {
    if (title.length && text.length) {
      this.title = title;
      this.text = text;
      this.editOpen = false;
    }
  };
  toggleEdit(): void {
    this.editOpen = !this.editOpen;
  };
}

export default Wish;