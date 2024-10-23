import { createEvent, createStore } from "effector";

const $token = createStore<string | null>(null);
const $ready = $token.map((state) => state !== null);

const setToken = createEvent<string | null>();
$token.on(setToken, (_, token) => token);

export const AuthStore = {
  $token,
  $ready,
  setToken,
};
