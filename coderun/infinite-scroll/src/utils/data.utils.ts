export interface FeedItem {
  title: string;
  description: string;
  image: {
    name: string;
    url: string;
  };
}

const getRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const getItem = (idx: number): FeedItem => ({
  title: `Random Name - ${idx}`,
  description:
    `Random Description ${idx} - Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
  dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`.slice(
      getRandom(100, 200)
    ),
  image: {
    name: `Random Name - ${idx}`,
    url: `https://picsum.photos/id/${idx}/250/250`,
  },
});
