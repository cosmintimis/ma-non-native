import { Link } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView>
    <Text>DeepFakeGuardian</Text>
    <Link href="/addMediaItemView/index" asChild>
      
    </Link>
  </SafeAreaView>
  );
}
