import { defineConfig } from "cypress";
import { TEST_URL } from "./src/constants";

export default defineConfig({
  e2e: {
    baseUrl: TEST_URL,
  },
});
