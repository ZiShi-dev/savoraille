'use client';

import Image, { type ImageProps } from 'next/image';

import { withBasePath } from '@/lib/site-config';

function resolveImageSrc(src: ImageProps['src']) {
  if (typeof src === 'string') return withBasePath(src);
  return src;
}

export function AppImage({ src, ...props }: ImageProps) {
  return <Image src={resolveImageSrc(src)} {...props} />;
}
