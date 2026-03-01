import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import api from "../services/api";

export default function Dashboard() {
  const [membership, setMembership] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const m = await api.get("/membership/me");
      const b = await api.get("/bookings/me?page=0&size=5");

      setMembership(m.data);
      setBookings(b.data.content);
    } catch (err: any) {
      Alert.alert(
        "Error",
        err.response?.data?.message || "Failed to load data",
      );
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Remaining Nights: {membership?.remainingNights}</Text>
      <Button
        title="Book Now"
        onPress={() => router.push("/booking/create" as any)}
      />

      <Text>Recent Bookings:</Text>
      {bookings.map((b) => (
        <Text key={b.id}>
          {b.hotelName} - {b.status}
        </Text>
      ))}
    </View>
  );
}
