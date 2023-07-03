import { defineStore } from "pinia";
import { API_URL } from "@/main";

export type WishType = {
  id: string | number,
  title: string,
  text: string,
};

export const useStore = defineStore("store", {
  state: () => ({
    list: [] as WishType[],
  }),
  actions: {
    async fetchWishesList(): Promise<void> {
      await fetch((API_URL as string) + "/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(r => r.json()).then(data => {
        this.list = data;
      });
    },
  },
});