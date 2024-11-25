import { MediaItemList } from "@/components/mediaItemList";
import { useMediaItemsStore } from "@/repository/repository";
import { useNavigation } from '@react-navigation/native';
import React from "react";
import { NativeSyntheticEvent, SafeAreaView, Text, TextInputFocusEventData, View } from "react-native";

export default function Index() {
  const navigation = useNavigation();
  const { handleSearch } = useMediaItemsStore();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Media Collection',
      headerShown: true,
      hideWhenScrolling: false,
      headerSearchBarOptions: {
        placeholder: 'Search',
        onChangeText: (text: NativeSyntheticEvent<TextInputFocusEventData>) => {
          handleSearch(text.nativeEvent.text);
        },
      },
    });
  }, [navigation]);
  return (
    <SafeAreaView>
      <MediaItemList />
    </SafeAreaView>
  );
}