import { ImageUriBuilder } from 'packages/bsky/src/image/uri.ts';
import React from 'react';
import { appContext } from 'src/contexts/appContext';

interface ThumbnailComponentProps {
  did: string;
  cid: string;
  width?: number;
  height?: number;
}

const ThumbnailComponent: React.FC<ThumbnailComponentProps> = ({
  did,
  cid,
  width = 100, // Default width if not provided as per server expectations
  height = 100, // Default height if not provided as per server expectations
}) => {
  const imageUriBuilder = new ImageUriBuilder(
    appContext.cfg.imgUriEndpoint,
    appContext.cfg.imgUriSalt,
    appContext.cfg.imgUriKey,
  );

  // Generate the thumbnail URI using the provided properties
  const thumbOptions = { src: `${did}/${cid}`, width, height };
  const thumbUri = imageUriBuilder.getSignedUri(thumbOptions);

  // Render the image using the generated URI
  return <img src={thumbUri} alt="Thumbnail" />;
};

export default ThumbnailComponent;
