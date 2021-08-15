import { defineConfig } from 'vite'
import { resolve } from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh'
import Pages from 'vite-plugin-pages'

import fs from "fs-extra";
import matter from "gray-matter";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    Pages({
      pagesDir: [
        { dir: 'src/pages', baseRoute: '' },
        { dir: 'src/features/admin/pages', baseRoute: 'admin' },
      ],
      extensions: ['tsx', 'md'],
      react: true,
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1));
        const md = fs.readFileSync(path, "utf-8");
        const { data } = matter(md);console.log(data.title)
        route.meta = Object.assign(route.meta || {}, { frontmatter: data.title });
        
        return route;
      }
    }),
  ],
})
