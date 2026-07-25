import { getSecret } from "astro:env/server";
import { Marble } from "@usemarble/sdk";

const key = getSecret("MARBLE_API_KEY");

export const marble = new Marble({
  apiKey: key,
});
