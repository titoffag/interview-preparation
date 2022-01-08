import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Carousel } from "./Carousel";

export default {
  title: "Example/Carousel",
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => (
  <Carousel {...args} />
);

export const Main = Template.bind({});
Main.args = {
  images: [
    {
      src: "https://ru.js.cx/carousel/1.png",
    },
    {
      src: "https://ru.js.cx/carousel/2.png",
    },
    {
      src: "https://ru.js.cx/carousel/3.png",
    },
    {
      src: "https://ru.js.cx/carousel/4.png",
    },
    {
      src: "https://ru.js.cx/carousel/5.png",
    },
    {
      src: "https://ru.js.cx/carousel/6.png",
    },
    {
      src: "https://ru.js.cx/carousel/7.png",
    },
    {
      src: "https://ru.js.cx/carousel/8.png",
    },
    {
      src: "https://ru.js.cx/carousel/9.png",
    },
    {
      src: "https://ru.js.cx/carousel/10.png",
    },
  ],
};
