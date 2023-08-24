"use client";
import { FacebookShareButton, TwitterShareButton, TwitterIcon, FacebookIcon } from 'react-share';

type Props = {
  url: string;
  title: string;
};

export default function ShareButtons({ url, title }: Props) {
  return (
    <div>
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
    </div>
  );
}