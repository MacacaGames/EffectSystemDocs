import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'en-US',

  title: 'Effect System',
  description: 'A dynamic calculator for game effect',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    navbar: [ 
      {
          text: "Home",
          link: "/README.md",
      },
      {
          text: "Documentation",
          link: "/Introduction.md",
      }
    ],

    sidebar: [
      "Introduction",
      "Installation",
      "Fundamentals",
      "Effect Editor Window",
      "Prepare Your Data",
      "Advanced",
      "TroubleShooting",
    ],
  }),

  bundler: viteBundler(),
})
