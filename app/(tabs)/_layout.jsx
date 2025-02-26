import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import { Tabs } from "expo-router";

const LayoutPage = () => {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#4361ee",
          borderBottomWidth: 2,
          borderBottomColor: "black",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: "#f6f4d2",
        },
        tabBarActiveTintColor: "#4361ee",
        tabBarInactiveTintColor: "black",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Note",
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="sticky-note" size={30} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="board"
        options={{
          title: "Board",
          tabBarIcon: ({ color }) => {
            return <FontAwesome5 name="chalkboard" size={24} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="datastore"
        options={{
          title: "Collection",
          tabBarIcon: ({ color }) => {
            return <MaterialIcons name="note-alt" size={30} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="notedetails"
        options={{
          title: "Note Details",
          tabBarIcon: ({ color }) => {
            return <FontAwesome6 name="database" size={24} color={color} />;
          },
        }}
      />
    </Tabs>
  );
};

export default LayoutPage;
