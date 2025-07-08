import { writable } from "svelte/store";

export const selectedId = writable<number | null>(null);


