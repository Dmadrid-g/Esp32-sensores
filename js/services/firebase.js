import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, onValue, query, limitToLast } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
import { DATABASE_URL, REST, HISTORIAL_FETCH_LIMIT } from "../config.js";

const app = initializeApp({ databaseURL: DATABASE_URL });
const database = getDatabase(app);

export function subscribeValue(path, callback, cancelCallback) {
  const reference = ref(database, path);
  const target = path.endsWith("/historial")
    ? query(reference, limitToLast(HISTORIAL_FETCH_LIMIT))
    : reference;
  return onValue(target, callback, cancelCallback);
}

export async function readREST(path) {
  const [route, queryString] = path.split("?");
  const url = `${REST}/${route}.json${queryString ? "?" + queryString : ""}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  return response.json();
}