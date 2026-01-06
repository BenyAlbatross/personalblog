import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import { remarkCitationIndex } from "./src/plugins/remark-citation-index.mjs";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  site: "https://example.com",
  integrations: [mdx({
    remarkPlugins: [remarkCitationIndex, remarkMath],
    rehypePlugins: [rehypeKatex],
  }), sitemap(), tailwind(), react()],
});
