import { useMediaItemsStore } from "@/repository/repository";
import { FlatList } from "react-native"
import { MediaItemCard } from "./mediaItemCard";

export const MediaItemList = () => {
    const { mediaItems } = useMediaItemsStore();
    return (
        <FlatList
            contentInsetAdjustmentBehavior="automatic"
            data={mediaItems}
            renderItem={({ item }) => ( <MediaItemCard mediaItem={item} /> )}
            keyExtractor={(item) => item.id}
        />
    )
}