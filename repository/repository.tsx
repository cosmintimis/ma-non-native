import { MediaItem, MEDIA_TYPE } from "@/model/mediaItem"
import { loadStoredImage } from "@/utils/generalUtils";
import { createContext, useEffect, useState } from "react";
import uuid from 'react-native-uuid';

async function loadInitMediaItems(): Promise<MediaItem[]> {
    const [mediaData1, mediaData2] = await Promise.all([
        loadStoredImage(require('../assets/images/cat1.jpg')),
        loadStoredImage(require('../assets/images/cat2.jpg')),
    ]);

    const mediaItems: MediaItem[] = [
        {
            id: uuid.v4(),
            title: "Title1",
            description: "Description1",
            location: "Borsa Maramures",
            type: MEDIA_TYPE.IMAGE,
            size: mediaData1.length,
            mediaData: mediaData1,
            tags: ["tag1", "tag2"],
        },
        {
            id: uuid.v4(),
            title: "Title2",
            description: "Description2",
            location: "Cluj-Napoca Cluj",
            type: MEDIA_TYPE.IMAGE,
            size: mediaData2.length,
            mediaData: mediaData2,
            tags: ["tag3", "tag4"],
        },
    ];
    return mediaItems;
}

type ExercisesContextType = {
  mediaItems: MediaItem[];
  setMediaItems: React.Dispatch<React.SetStateAction<MediaItem[]>>;
};

export const ExercisesContext = createContext<ExercisesContextType>({
  mediaItems: [],
  setMediaItems: () => {},
});

export const MediaItemsProvider = ({ children }: any) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    loadInitMediaItems().then((mediaItems) => setMediaItems(mediaItems)).catch((error) => console.error(error));
  }, []);

  return (
    <ExercisesContext.Provider
      value={{ mediaItems, setMediaItems }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};
