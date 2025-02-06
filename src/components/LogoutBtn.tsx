/* Core */
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

/* Context */
import { useAuth } from "#context/Auth.context";

/* Misc */
import { windowWidth as hScale } from "#utils/ScreenDimensions";

const LogoutBtn = () => {
  const { onLogout } = useAuth();

  const router = useRouter();

  const handleLogout = async () => {
    await onLogout();

    router.replace("/");
  };

  return (
    <View>
      <Pressable style={{ marginRight: 12 }} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={hScale(24)} />
      </Pressable>
    </View>
  );
};

export default LogoutBtn;
