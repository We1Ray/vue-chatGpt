<template>
  <main>
    <div id="chat_container">
      <div
        v-for="(chat, i) in wrapper"
        :key="i"
        class="wrapper"
        :class="{ ai: chat.isAi }"
      >
        <Chat :chat="chat" :key="i" />
      </div>
    </div>
    <form @submit.prevent="fetchAnswer">
      <textarea
        rows="1"
        cols="1"
        placeholder="請輸入..."
        v-model="question"
      ></textarea>
      <button type="submit"><img src="@/assets/send.svg" alt="send" /></button>
    </form>
  </main>
</template>

<script setup>
import CallApi from "../api/CallApi";
import { ref } from "vue";
import Chat from "@/components/Chat.vue";

const question = ref("");
const wrapper = ref([]);
const loading = ref(false);

const fetchAnswer = async () => {
  try {
    loading.value = true;
    wrapper.value.push({
      isAi: false,
      value: question.value,
    });
    wrapper.value.push({
      isAi: true,
      value: "Loading....",
    });

    await CallApi.postApi(
      "https://localhost:7001/Gpt",
      {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        accept: "text/plain",
      },
      {
        question: question.value,
      }
    )
      .then((res) => {
        if (res) {
          const parsedData = res.data.value.choices[0].message.content;
          wrapper.value.pop();
          wrapper.value.push({
            isAi: true,
            value: parsedData,
          });
        }
      })
      .catch((error) => {
        console.log("EROOR:" + ip);
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
    question.value = "";
  }
};
</script>
