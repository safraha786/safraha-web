import React, { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import api from "../services/api";

export default function Bookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    loadBookings();
  }, [page]);

  const loadBookings = async () => {
    const res = await api.get(`/bookings/me?page=${page}&size=5`);
    setBookings(res.data.content);
  };

  const cancelBooking = async (id: number) => {
    Alert.alert("Cancel booking", "Are you sure you want to cancel?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            await api.put(`/bookings/${id}/cancel`);
            loadBookings();
          } catch (err: any) {
            Alert.alert(
              "Error",
              err.response?.data?.message || "Failed to cancel",
            );
          }
        },
      },
    ]);
  };

  return (
    <View style={{ padding: 20 }}>
      {bookings.map((b) => (
        <View key={b.id}>
          <Text>{b.hotelName}</Text>
          <Text>
            {b.checkInDate} - {b.checkOutDate}
          </Text>
          <Text>Status: {b.status}</Text>

          {b.status === "CONFIRMED" && (
            <Button title="Cancel" onPress={() => cancelBooking(b.id)} />
          )}
        </View>
      ))}

      <Button title="Next Page" onPress={() => setPage(page + 1)} />
    </View>
  );
}
