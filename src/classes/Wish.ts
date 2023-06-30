import IsWish from "@/interfaces/IsWish";

class Wish implements IsWish {
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
  edit(title: string, text: string): void {
    if (title.length && text.length) {
      this.title = title;
      this.text = text;
      this.editOpen = false;
    }
  }
  toggleEdit(): void {
    this.editOpen = !this.editOpen;
  }
}

export default Wish;