import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      await login(res.data.token);
      router.replace("/dashboard" as any);
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Login failed");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} />

      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />

      <Button title="Login" onPress={handleLogin} />
      <Button title="Signup" onPress={() => router.push("/signup" as any)} />
    </View>
  );
}
