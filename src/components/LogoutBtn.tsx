/* Core */
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

/* Context */
//import { useAuth } from "#context/Auth.context";
import { useAuth } from "#store/Auth.context";

/* Misc */
import { windowWidth as hScale } from "#utils/ScreenDimensions";

const LogoutBtn = () => {
  const { signOut } = useAuth();

  const router = useRouter();

  const handleLogout = async () => {
    console.log("Logout");
    await signOut();

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
