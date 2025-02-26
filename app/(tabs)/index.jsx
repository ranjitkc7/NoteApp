import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import "../../global.css";

const NotePage = () => {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");

  const handleStore = async () => {
    if (!title.trim() || !note.trim()) {
      Alert.alert("Error", "Title and Note cannot be empty");
      return;
    }
    try {
      const noteData = { title, note };
      const storedData = await AsyncStorage.getItem("notes");
      const notesArray = storedData ? JSON.parse(storedData) : [];

      notesArray.push(noteData);
      await AsyncStorage.setItem("notes", JSON.stringify(notesArray));

      Alert.alert("Success", "Note saved successfully");

      setNote("");
      setTitle("");
    } catch (error) {
      Alert.alert("Error", "Failed to save note");
    }
  };
  return (
    <View className="bg-[#f5fbde] flex-1 items-center justify-start px-[1rem] pt-[10px]">
      <View className="relative h-[70%] w-full rounded-md border-[2px] border-[#4361ee]">
        <TextInput
          placeholder="Note Title..."
          className="w-full bg-white p-[10px] pt-[12px] border-b-[1px] border-[#4361ee] text-black placeholder:text-[1.3rem] placeholder:font-[700]"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Write a note..."
          className="h-[26rem] w-full bg-white p-[10px] text-black placeholder:text-[1.1rem]"
          multiline
          value={note}
          onChangeText={setNote}
          numberOfLines={15}
          textAlignVertical="top"
        />
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-[6rem] rounded-md bg-[#4361ee] items-center justify-center absolute bottom-[0.6rem] right-[0.6rem] h-[2.3rem]"
          onPress={() => {
            setNote("");
            setTitle("");
          }}
        >
          <Text className="text-white font-[700] text-[1.1rem]">Clear</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleStore}
        activeOpacity={0.8}
        className="bg-[#4361ee] absolute bottom-5 right-6 h-[5rem] w-[5rem] rounded-full items-center justify-center"
      >
        <Entypo name="plus" size={50} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        className="w-[9rem] rounded-md bg-[#4361ee] items-center justify-center mt-[1rem] h-[3rem]"
        onPress={() => router.push("/dataStore")}
      >
        <Text className="text-white font-[700] text-[1.1rem]">Show Notes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotePage;
