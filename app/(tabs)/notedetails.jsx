import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";


const NoteDetail = () => {
  const router = useRouter();
  const { title, note } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-[#f5fbde] p-[1rem]">
      <Text className="text-[1.5rem] font-bold text-center mb-[1rem]">
        {title}
      </Text>
      <Text className="text-[1.2rem]">{note}</Text>

      <TouchableOpacity
        className="mt-[2rem] bg-[#4361ee] p-[10px] rounded-md items-center"
        onPress={() => router.back()}
      >
        <Text className="text-white font-bold">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoteDetail;
