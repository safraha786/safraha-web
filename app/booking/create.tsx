import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import api from "../../services/api";

export default function CreateBooking() {
  const [hotelId, setHotelId] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const router = useRouter();

  const isWeekend = (date: string) => {
    const d = new Date(date);
    const day = d.getDay();
    return day === 0 || day === 6;
  };

  const handleBooking = async () => {
    if (isWeekend(checkInDate) || isWeekend(checkOutDate)) {
      Alert.alert("Error", "Only weekday bookings allowed");
      return;
    }

    try {
      await api.post("/bookings", {
        hotelId: Number(hotelId),
        checkInDate,
        checkOutDate,
      });

      Alert.alert("Success", "Booking successful");
      // cast to any because expo-router's type definitions don't yet include this path
      router.replace("/bookings" as any);
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Hotel ID" onChangeText={setHotelId} />
      <TextInput
        placeholder="Check-in YYYY-MM-DD"
        onChangeText={setCheckInDate}
      />
      <TextInput
        placeholder="Check-out YYYY-MM-DD"
        onChangeText={setCheckOutDate}
      />
      <Button title="Book" onPress={handleBooking} />
    </View>
  );
}
