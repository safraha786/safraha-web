import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import api from "../services/api";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await api.post("/auth/signup", { email, password });
      Alert.alert("Success", "Signup successful");
      router.replace("/");
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
}
