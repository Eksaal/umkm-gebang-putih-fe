'use client';
import { buildUrl } from 'cloudinary-build-url';
import clsx from 'clsx';
import Image from 'next/image';
import React, { CSSProperties, useState } from 'react';
import Lightbox from 'react-image-lightbox';


interface AspectRatio {
  width: number;
  height: number;
}

interface CloudinaryImageProps
  extends React.ComponentPropsWithoutRef<'figure'> {
  publicId: string;
  height: string | number;
  width: string | number;
  alt: string;
  title?: string;
  className?: string;
  preview?: boolean;
  noStyle?: boolean;
  aspect?: AspectRatio;
  mdx?: boolean;
  style?: CSSProperties;
  scale?: boolean;
}

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  publicId,
  height,
  width,
  alt,
  title,
  className,
  preview = true,
  noStyle = false,
  mdx = false,
  style,
  aspect,
  scale = false,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const urlBlurred = buildUrl(publicId, {
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
    },
    transformations: {
      effect: {
        name: 'blur:1000',
      },
      quality: 1,
      rawTransformation: aspect
        ? `c_fill,ar_${aspect.width}:${aspect.height},w_${width}`
        : undefined,
    },
  });

  const url = buildUrl(publicId, {
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
    },
    transformations: {
      rawTransformation: aspect
        ? `c_fill,ar_${aspect.width}:${aspect.height},w_${width}`
        : undefined,
    },
  });

  const aspectRatio = aspect ? aspect.height / aspect.width : undefined;

  const RESIZE_MAX_WIDTH = 1000;
  const resizedToMaxWidth = mdx && +width >= RESIZE_MAX_WIDTH;

  return (
    <figure
      className={clsx(className, {
        'overflow-hidden rounded shadow dark:shadow-none': !noStyle,
        'mx-auto w-full': mdx && +width <= 800,
      })}
      style={{
        ...(mdx && +width <= 800 ? { maxWidth: width } : {}),
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          position: 'relative',
          height: 0,
          paddingTop: aspectRatio
            ? `${aspectRatio * 100}%`
            : `${(+height / +width) * 100}%`,
          cursor: preview ? 'zoom-in' : 'default',
        }}
        className='img-blur'
        onClick={preview ? () => setIsOpen(true) : undefined}
      >
        <style jsx>{`
          .img-blur::before {
            content: '';
            position: absolute;
            inset: 0;
            filter: blur(20px);
            z-index: 0;
            background-image: url(${urlBlurred});
            background-position: center center;
            background-size: 100%;
          }
        `}</style>
        <div
          className={clsx(
            'absolute left-0 top-0 bottom-0 right-0',
            scale ? 'scale-150' : '',
          )}
        >
          <Image
            width={Number(
              resizedToMaxWidth ? Math.min(+width, RESIZE_MAX_WIDTH) : width,
            )}
            height={Number(
              resizedToMaxWidth
                ? (RESIZE_MAX_WIDTH * +height) / +width
                : height,
            )}
            unoptimized
            src={url}
            alt={alt}
            title={title || alt}
            className={clsx(scale ? 'scale-150' : '')}
          />
        </div>
      </div>
      {isOpen && (
        <Lightbox mainSrc={url} onCloseRequest={() => setIsOpen(false)} />
      )}
    </figure>
  );
};

export default CloudinaryImage;