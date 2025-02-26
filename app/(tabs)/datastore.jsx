import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

const DataPage = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNote, setFilteredNote] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [searchNote, setSearchNote] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const storedData = await AsyncStorage.getItem("notes");
        if (storedData) {
          const parsedNote = JSON.parse(storedData);
          setNotes(parsedNote);
          setFilteredNote(parsedNote);
        } else {
          setNotes([]);
          setFilteredNote([]);
        }
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };
    fetchNotes();
  }, []);
 
  useEffect(() => {
    if(searchNote.trim() === ""){
      setFilteredNote(notes);
    }else{
     setFilteredNote(
      notes.filter((note) =>
       note.title.toLowerCase().includes(searchNote.toLowerCase()) ||
       note.note.toLowerCase().includes(searchNote.toLowerCase())
      )
     );
    }
  }, [searchNote, notes]);

  const deleteNote = async (index) => {
    try {
      if (index < 0 || index >= notes.length) {
        console.error("Invalid index");
        return;
      }
      const updatedNotes = [...notes];
      updatedNotes.splice(index, 1);
      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
      Alert.alert("Success", "Note deleted successfully");
    } catch (error) {
      console.error("Error deleting note", error);
      Alert.alert("Error", "Failed to delete note");
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        router.push({
          pathname: "/notedetails",
          params: {
            title: item.title,
            note: item.note,
          },
        });
      }}
      className="p-[10px] mt-[0.3rem]  bg-[#4361ee] mb-[0.2rem] rounded-md w-full 
      flex-row text-center justify-between"
    >
      <Text className="text-[1.2rem] text-white font-serif font-[700]">
        {item.title}
      </Text>
      <TouchableOpacity
        onPress={() => deleteNote(notes.indexOf(item))}
        activeOpacity={0.8}
        className="mr-[0.5rem] h-[3rem] w-[3rem] bg-white rounded-full flex i
      items-center justify-center"
      >
        <MaterialCommunityIcons name="delete" size={30} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View className="bg-[#f5fbde] flex-1 items-center justify-start pt-[1px]">
      <View
        className="bg-[#061250] px-[1rem] flex-row justify-between 
       h-[3.5rem] w-full items-center "
      >
        <Text className="text-[1.3rem] font-[700] text-white">
          Saved Notes List
        </Text>
        <TouchableOpacity
          className="h-[3rem] w-[3rem] rounded-full items-center
         justify-center bg-white"
          onPress={() => setShowInput(!showInput)}
        >
          <FontAwesome name="search" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View className="w-full relative">
        {showInput && (
          <View className="flex-row">
            <TextInput
              placeholder="Search...."
              placeholderTextColor="white"
              className="mx-[2rem] my-[10px] h-[3rem]  rounded-md
              bg-black px-[12px] w-[22rem] text-white placeholder:text-[1.1rem]"
              value={searchNote}
              onChangeText={setSearchNote}
            />
          </View>
        )}
      </View>
      <View className="w-full px-[1rem]">
        {notes.length === 0 ? (
          <Text className="text-[1.2rem] text-center mt-[1rem] text-slate-500">
            No notes available
          </Text>
        ) : (
          <FlatList
            data={filteredNote}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        )}
      </View>
    </View>
  );
};

export default DataPage;
