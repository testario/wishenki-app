<script setup lang="ts">
import Wish from "./classes/Wish.ts";
import IsWish from "./interfaces/IsWish.ts";
import {onMounted, reactive, ref} from "vue";
import Card from "primevue/card";
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';

const wishes : object[] = [
  {
    id: 0,
    title: "Порш",
    text: "Хочу себе купить наконец",
    editOpen: false
  },
  {
    id: 1,
    title: "Макбук",
    text: "Хочу работать на нормальном ноутбуке",
    editOpen: false
  },
  {
    id: 2,
    title: "Хлеб",
    text: "Мне лень идти за хлебом, принесите плз",
    editOpen: false
  }
];
const reactiveWishes = ref<IsWish[]>([]);
const editModel = reactive<{title: string, text: string}>({
  title: "",
  text: ""
})
const getWishesToClass = () : void => {
  wishes.forEach(wish => {
    reactiveWishes.value.push(new Wish(wish.id, wish.title, wish.text, wish.editOpen))
  })
};
onMounted(() => getWishesToClass());
</script>

<template>
  <div class="container mx-auto py-10">
    <div class="grid grid-cols-3 gap-10">
      <Card v-for="wish of reactiveWishes" :key="wish.id">
        <template #title>
          <template v-if="!wish.editOpen">{{ wish.title }}</template>
          <input-text class="w-full p-2" v-else v-model="editModel.title" placeholder="Enter a title" />
        </template>
        <template #content>
          <p v-if="!wish.editOpen">
            {{ wish.text }}
          </p>
          <textarea class="w-full p-2" v-else v-model="editModel.text" placeholder="Enter a text" />
        </template>
        <template #footer>
          <Button v-if="!wish.editOpen" icon="pi pi-pencil" label="Edit" severity="secondary" @click="wish.toggleEdit()" />
          <Button v-else icon="pi pi-check" label="Save" severity="secondary" @click="wish.edit(editModel.title, editModel.text)" />
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>

</style>
