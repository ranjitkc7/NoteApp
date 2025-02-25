import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import "../../global.css";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const NotePage = () => {
  const router = useRouter();
  const [note, setNote] = useState(null);
  const handleStore = async () => {
    if (!note.trim()) {
      Alert.alert("Error", "Note cannot be empyt");
      return;
    }
    try {
      await AsyncStorage.setItem("note", note);
      Alert.alert("Success", "Note saved successfully");
      setNote("");
    } catch (error) {
      Alert.alert("Error", "Failed to save note");
    }
  };
  return (
    <View className="bg-[#f5fbde] flex-1 items-center justify-start px-[1rem] pt-[10px]">
      <View className='relative h-[70%] w-full '>
        <TextInput
          placeholder="Write a note..."
          className="h-full w-full border-[1px] rounded-md border-[#4361ee]
      bg-white p-[10px] text-black placeholder:text-[1.1rem] "
          multiline
          value={note}
          onChangeText={setNote}
          numberOfLines={20}
          textAlignVertical="top"
        />
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-[6rem] rounded-md bg-[#4361ee]
       items-center justify-center absolute bottom-[0.6rem] right-[0.6rem]
        h-[2.3rem]"
          onPress={() => setNote("")}
        >
          <Text className="text-white font-[700] text-[1.1rem]">Clear</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleStore}
        activeOpacity={0.8}
        className="bg-[#4361ee] absolute bottom-5 right-6 h-[5rem] w-[5rem] rounded-full items-center
       justify-center"
      >
        <Entypo name="plus" size={50} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        className="w-[9rem] rounded-md bg-[#4361ee]
       items-center justify-center mt-[1rem] h-[3rem]"
        onPress={() => router.push("/dataStore")}
      >
        <Text className="text-white font-[700] text-[1.1rem]">Show Notes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotePage;
