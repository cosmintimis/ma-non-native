import { MediaItem, MEDIA_TYPE } from "@/model/mediaItem";
import { loadStoredImage } from "@/utils/generalUtils";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import uuid from "react-native-uuid";

async function loadInitMediaItems(): Promise<MediaItem[]> {
  const [mediaData1, mediaData2] = await Promise.all([
    loadStoredImage(require("../assets/images/cat1.jpg")),
    loadStoredImage(require("../assets/images/cat2.jpg")),
  ]);

  const mediaItems: MediaItem[] = [
    {
      id: uuid.v4(),
      title: "Title1",
      description: "Description1",
      location: "Borsa Maramures",
      type: MEDIA_TYPE.IMAGE,
      mimeType: "image/jpeg",
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
      mimeType: "image/jpeg",
      size: mediaData2.length,
      mediaData: mediaData2,
      tags: ["tag3", "tag4"],
    },
  ];
  return mediaItems;
}

type MediaItemContextType = {
  mediaItems: MediaItem[];
  setMediaItems: React.Dispatch<React.SetStateAction<MediaItem[]>>;
  handleSearch: (searchTerm: string) => void;
  deleteMediaItem: (id: string) => void;
};

export const MediaItemContext = createContext<MediaItemContextType>({
  mediaItems: [],
  setMediaItems: () => {},
  handleSearch: () => {},
  deleteMediaItem: () => {},
});

export const MediaItemsProvider = ({ children }: any) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const allMediaItems = useRef<MediaItem[]>([]);
  const lastSearchTerm = useRef<string>("");

  const loadInit = async () => {
    const mediaItems = await loadInitMediaItems();
    setMediaItems(mediaItems);
    allMediaItems.current = mediaItems;
  };

  useEffect(() => {
    loadInit();
  }, []);

  const handleSearch = (searchTerm: string) => {
    lastSearchTerm.current = searchTerm;
    if (searchTerm === "") {
      setMediaItems(allMediaItems.current);
      return;
    }

    const filteredMediaItems = (allMediaItems.current).filter((mediaItem) =>
      mediaItem.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMediaItems(filteredMediaItems);
  };

  const deleteMediaItem = (id: string) => {
    const newMediaItems = (allMediaItems.current).filter((mediaItem) => mediaItem.id !== id);
    allMediaItems.current = newMediaItems;
    handleSearch(lastSearchTerm.current);
  };

  return (
    <MediaItemContext.Provider
      value={{ mediaItems, setMediaItems, handleSearch, deleteMediaItem }}
    >
      {children}
    </MediaItemContext.Provider>
  );
};

export const useMediaItemsStore = () => {
  return useContext(MediaItemContext);
};
