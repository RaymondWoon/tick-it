/* Core */
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* Context */
import { useAuth } from "#context/Auth.context";

/* Misc */
import { windowWidth as hScale } from "#utils/ScreenDimensions";

const LogoutBtn = () => {
  const { onLogout } = useAuth();

  return (
    <View>
      <Pressable style={{ marginRight: 12 }} onPress={onLogout}>
        <Ionicons name="log-out-outline" size={hScale(24)} />
      </Pressable>
    </View>
  );
};

export default LogoutBtn;
