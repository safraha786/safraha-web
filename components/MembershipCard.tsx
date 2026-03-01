import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface MembershipCardProps {
  level: string;
  benefits: string;
}

export default function MembershipCard({
  level,
  benefits,
}: MembershipCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.level}>{level}</Text>
      <Text style={styles.benefits}>{benefits}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 5,
  },
  level: {
    fontSize: 16,
    fontWeight: "bold",
  },
  benefits: {
    fontSize: 14,
    color: "#666",
  },
});
