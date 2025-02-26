import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

const NoteDetail = () => {
  const router = useRouter();
  const { title, note } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-[#f5fbde] p-[1rem]">
      <View className='h-[20rem] w-full rounded-md border-[1px]
       border-[#4361ee] bg-white'>
        <Text className="text-[1.5rem] my-[0.5rem] font-bold text-center">
          {title}
        </Text>
        <Text className="text-[1.2rem] pl-[5px]">{note}</Text>
      </View>
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
