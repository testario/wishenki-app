<script setup lang="ts">
import { Wish } from "@/classes/Wish";
import { onMounted, reactive, ref } from "vue";
import Card from "primevue/card";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import ConfirmDialog from "primevue/confirmdialog";
import Toast from "primevue/toast";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import {
  IsWish,
  WishEditModel,
} from "@/interfaces/IsWish";
import {useStore, WishType} from "@/store";

const reactiveWishes = ref<IsWish[]>([]);
const editModel = reactive<WishEditModel>({
  title: "",
  text: "",
});

const store = useStore();
const getWishesToClass = async(): Promise<void> => {
  await store.fetchWishesList().then(() => {
    store.list.forEach((wish: WishType): void => {
      let output: IsWish = new Wish(wish.id, wish.title, wish.text, false);
      reactiveWishes.value.push(output);
    });
  });
};

const confirm = useConfirm();
const toast = useToast();

const confirmationHandler = (wish: IsWish): void => {
  confirm.require({
    group: "confirmation",
    message: "Are you sure you want to proceed?",
    header: "Confirmation",
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    acceptClass: "p-button-success",
    rejectClass: "p-button-secondary",
    accept: () => {
      wish.edit(editModel);
    },
    reject: () => {
      toast.add({ severity: "warn", summary: "Rejected", detail: "You didn't save", life: 3000 });
    },
  });
};

onMounted(() => getWishesToClass());
</script>

<template>
  <div class="container mx-auto py-10">
    <Toast />
    <ConfirmDialog group="confirmation">
      <template #message="slotProps">
        <div class="flex p-4">
          <i :class="slotProps.message.icon" style="font-size: 1.5rem" />
          <p class="pl-2">{{ slotProps.message.message }}</p>
        </div>
      </template>
    </ConfirmDialog>
    <div class="grid grid-cols-3 gap-10 items-start">
      <Card
        v-for="wish of reactiveWishes"
        :key="wish.id"
        class="flex flex-col"
      >
        <template #title>
          <template v-if="!wish.editOpen">
            {{ wish.title }}
          </template>
          <InputText
            v-else
            v-model="editModel.title"
            class="w-full p-2"
            placeholder="Enter a title"
          />
        </template>
        <template #content>
          <p
            v-if="!wish.editOpen"
            class="line-clamp-3 h-20"
          >
            {{ wish.text }}
          </p>
          <Textarea
            v-else
            v-model="editModel.text"
            class="w-full p-2 h-40"
            placeholder="Enter a text"
          />
        </template>
        <template #footer>
          <Button
            v-if="!wish.editOpen"
            icon="pi pi-pencil"
            label="Edit"
            severity="secondary"
            @click="wish.toggleEdit(editModel)"
          />
          <template v-else>
            <div
              class="flex justify-between"
            >
              <Button
                icon="pi pi-check"
                label="Save"
                severity="success"
                @click="confirmationHandler(wish)"
              />
              <Button
                icon="pi pi-times"
                label="Close"
                severity="secondary"
                @click="wish.toggleEdit()"
              />
            </div>
          </template>
        </template>
      </Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
