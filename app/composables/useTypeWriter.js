import { nextTick } from "vue";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function typeLine(text, callback) {
  let current = "";

  for (const c of text) {
    current += c;

    // Send current text to whoever is listening (chat page)
    callback(current);

    await nextTick();
    await wait(20 + Math.random() * 40);
  }

  await wait(150);

  return current;
}
