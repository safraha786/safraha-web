import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import api from "../services/api";

export default function Membership() {
  const [membership, setMembership] = useState<any>(null);

  useEffect(() => {
    api.get("/membership/me").then((res) => setMembership(res.data));
  }, []);

  if (!membership) return null;

  return (
    <View style={{ padding: 20 }}>
      <Text>Region: {membership.region}</Text>
      <Text>Total Nights: {membership.totalNights}</Text>
      <Text>Used Nights: {membership.usedNights}</Text>
      <Text>Remaining Nights: {membership.remainingNights}</Text>
      <Text>Start: {membership.startDate}</Text>
      <Text>End: {membership.endDate}</Text>
      <Text>Status: {membership.active ? "Active" : "Expired"}</Text>
    </View>
  );
}
