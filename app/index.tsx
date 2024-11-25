import { Link } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView>
    <Text className="text-red-600">DeepFakeGuardian</Text>
    <Link href="/addMediaItemView" asChild>
      
    </Link>
  </SafeAreaView>
  );
}
