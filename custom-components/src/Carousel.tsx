import React, { FC } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const Container = styled.div`
  position: relative;
  width: 398px;
  padding: 10px 40px;
  border: 1px solid #ccc;
  border-radius: 15px;
  background: #eee;
`;
const dynamicStyle = (props) =>
  css`
    ${props.kind === "left" ? "left: 7px" : "right: 7px"};
  `;
const Control = styled.button`
  position: absolute;
  top: 60px;
  padding: 0;
  background: #ddd;
  border-radius: 15px;
  border: 1px solid gray;
  font-size: 24px;
  line-height: 24px;
  color: #444;
  display: block;

  &:focus {
    outline: none;
  }

  &:hover {
    background: #ccc;
    cursor: pointer;
  }

  ${dynamicStyle}
`;
const Window = styled.div`
  width: 390px;
  overflow: hidden;
`;
const Galery = styled.ul`
  height: 130px;
  width: 9999px;
  margin: 0;
  padding: 0;
  list-style: none;
  transition: margin-left 250ms;
  font-size: 0;
`;
const Capture = styled.li`
  display: inline-block;
`;
const Image = styled.img`
  display: block;
  width: 130px;
  height: 130px;
`;

type Images = {
  src: string;
  alt?: string;
};
interface CarouselProps {
  images: Images[];
}

export const Carousel: FC<CarouselProps> = ({ images }) => {
  return (
    <Container>
      <Control kind="left">⇦</Control>
      <Window>
        <Galery>
          {images.map(({ src, alt }) => (
            <Capture key={src}>
              <Image src={src} alt={alt} />
            </Capture>
          ))}
        </Galery>
      </Window>
      <Control kind="right">⇨</Control>
    </Container>
  );
};
