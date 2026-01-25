import { Marble } from "@usemarble/sdk";
import { getSecret } from "astro:env/server";

const key = getSecret("MARBLE_API_KEY");

export const marble = new Marble({
  apiKey: key,
});
