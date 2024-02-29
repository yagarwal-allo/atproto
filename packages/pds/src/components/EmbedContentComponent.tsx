import React from 'react';
import { ImageUriBuilder } from 'packages/bsky/src/image/uri.ts';
import { appContext } from 'src/contexts/appContext';

interface EmbedContentComponentProps {
  externalData: {
    thumb: string;
    // other properties may be included based on application requirements
  };
  // other props as needed
}

const EmbedContentComponent: React.FC<EmbedContentComponentProps> = ({ externalData }) => {
  function generateThumbnailUri(thumb: string) {
    const imageUriBuilder = new ImageUriBuilder(
      appContext.cfg.imgUriEndpoint,
      appContext.cfg.imgUriSalt,
      appContext.cfg.imgUriKey,
    );

    try {
      const thumbOptions = imageUriBuilder.getVerifiedOptions(thumb);
      return imageUriBuilder.getSignedUri(thumbOptions);
    } catch (err) {
      console.error("Error generating the thumbnail URI: ", err);
      return ''; // Return a placeholder or empty string on error
    }
  }

  const thumbUri = generateThumbnailUri(externalData.thumb);

  return (
    <div>
      {thumbUri ? (
        <img src={thumbUri} alt="Embedded Content Thumbnail" />
      ) : (
        <p>Thumbnail not available</p>
      )}
    </div>
  );
};

export default EmbedContentComponent;
