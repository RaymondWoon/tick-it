/* /* src/screens/Home.screen.tsx */

// ==================================================
// Core packages
// ==================================================
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "expo-router";

// ==================================================
// Hooks
// ==================================================
import { useThemeColors } from "#hooks/useThemeColors";

// ==================================================
// Components
// ==================================================
import ThemedScreenWrapper from "#components/themed/ScreenWrapper";
import TabHeader from "#components/themed/TabHeader";
import { IconSymbol } from "#/components/ui/IconSymbol";
import { AvatarImg } from "#theme/Images";

// ==================================================
// Context
// ==================================================
import { useAuth } from "#store/Auth.context";
import { fontSizes } from "#theme";

/* Dummy data */
const upcomingTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Details of Task 1",
    status: "Pending",
  },
  {
    id: 2,
    title: "Task 2",
    description: "Details of Task 2",
    status: "Pending",
  },
  {
    id: 3,
    title: "Task 3",
    description: "Details of Task 3",
    status: "Pending",
  },
  {
    id: 4,
    title: "Task 4",
    description: "Details of Task 4",
    status: "Pending",
  },
  {
    id: 5,
    title: "Task 5",
    description: "Details of Task 5",
    status: "Pending",
  },
];

type TaskItemProps = {
  title: string;
  description?: string;
  status: string;
};

const UpcomingTaskItem = ({ title, description, status }: TaskItemProps) => (
  <View style={styles.taskContainer}>
    <Text style={styles.taskTitle}>{title}</Text>
    <Text style={styles.taskDesc}>{description}</Text>
    <Text>Status : {status}</Text>
  </View>
);

const todayTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Details of Task 1",
    status: "Pending",
  },
  {
    id: 2,
    title: "Task 2",
    description: "Details of Task 2",
    status: "Pending",
  },
  {
    id: 3,
    title: "Task 3",
    description: "Details of Task 3",
    status: "Pending",
  },
  {
    id: 4,
    title: "Task 4",
    description: "Details of Task 4",
    status: "In Progress",
  },
  {
    id: 5,
    title: "Task 5",
    description: "Details of Task 5",
    status: "In Progress",
  },
  {
    id: 6,
    title: "Task 6",
    description: "Details of Task 6",
    status: "In Progress",
  },
  {
    id: 7,
    title: "Task 7",
    description: "Details of Task 7",
    status: "Done",
  },
  {
    id: 8,
    title: "Task 8",
    description: "Details of Task 8",
    status: "Done",
  },
  {
    id: 9,
    title: "Task 9",
    description: "Details of Task 9",
    status: "Done",
  },
  {
    id: 10,
    title: "Task 9",
    description: "Details of Task 9",
    status: "Done",
  },
  {
    id: 11,
    title: "Task 9",
    description: "Details of Task 9",
    status: "Done",
  },
];

const TodayTaskItem = ({ title, description, status }: TaskItemProps) => {
  let statusColor;

  switch (status) {
    case "Pending":
      statusColor = "red";
      break;
    case "In Progress":
      statusColor = "yellow";
      break;
    case "Done":
      statusColor = "green";
      break;
    default:
      statusColor = "gray";
      break;
  }
  return (
    <View style={styles.taskContainer}>
      <View style={styles.statusCircle}>
        <Text style={styles.taskTitle}>{title}</Text>
        <View
          style={[styles.pendingTask, { backgroundColor: statusColor }]}
        ></View>
      </View>
      <View style={styles.statusDetails}>
        <Text style={styles.taskDesc}>{description}</Text>
        <Text style={styles.taskDesc}>{status}</Text>
      </View>
    </View>
  );
};

const HomeScreen = () => {
  /**
   * Username state
   * @type {[string, React.Dispatch<React.SetStateAction<string>>]}
   */
  //const [username, setUsername] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("");
  const [filteredTasks, setFilteredTasks] = useState(todayTasks);
  const [activeTab, setActiveTab] = useState("All");

  /* user authentication hook */
  const { user } = useAuth();

  /* theme color hook */
  const { colors } = useThemeColors();

  const navigation = useNavigation<DrawerNavigationProp<any>>();

  // ==================================================
  // Effects
  // ==================================================
  // useEffect(() => {
  //   setUsername(user?.displayName || "");
  // }, []);

  useEffect(() => {
    getGreeting();
  }, []);

  // ==================================================
  // Render
  // ==================================================

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("morning");
    } else if (hour > 12 && hour <= 18) {
      setGreeting("afternoon");
    } else if (hour > 18 && hour <= 21) {
      setGreeting("evening");
    } else {
      setGreeting("night");
    }
  };

  const filterTasks = (status: string) => {
    let filtered;

    if (status === "All") {
      filtered = todayTasks;
    } else {
      filtered = todayTasks.filter((task) => task.status === status);
    }
    setFilteredTasks(filtered);
    setActiveTab(status);
  };

  const handleAddTask = () => {
    console.log("Add task clicked!");
  };

  return (
    // <ThemedScreenWrapper>
    //   <TabHeader onPressLeft={() => navigation.openDrawer()}>
    //     <Text style={{ fontSize: fontSizes.FONT18 }}>
    //       Hi {user?.displayName}
    //     </Text>
    //   </TabHeader>
    //   <View style={styles.temp}>
    //     <Text style={{ fontSize: 18 }}>Welcome {user?.displayName}</Text>
    //     <Text style={{ fontSize: 18 }}>Home Screen</Text>
    //   </View>
    // </ThemedScreenWrapper>

    <View style={styles.homeContainer}>
      {/* Header */}
      <View
        style={[styles.homeView, { backgroundColor: colors.color.primary }]}
      >
        <View style={styles.profileView}>
          <View>
            <Image source={AvatarImg} style={styles.userProfileImg} />
          </View>
          <View style={styles.details}>
            <Text style={styles.mesText}>Good {greeting}, John</Text>
            <Text style={styles.tasksText}>4 Tasks remaining</Text>
          </View>
        </View>
      </View>

      {/* Today's summary */}
      <View style={styles.taskSummaryView}>
        <View
          style={[
            styles.taskSummaryCard,
            { backgroundColor: colors.color.secondary },
          ]}
        >
          <View style={styles.addView}>
            <View>
              <Text style={styles.taskText}>Today Task Summary</Text>
              <Text style={{ paddingHorizontal: 10 }}>
                Progress <Text style={styles.percentageText}>85%</Text>
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={handleAddTask}>
                {/* <Image source={AddTaskImg} style={styles.addTaskImg} /> */}
                <IconSymbol
                  name="plus.circle.fill"
                  color={colors.color.primary}
                  size={52}
                  style={{ paddingTop: 5 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Upcoming tasks */}
      <ScrollView>
        <View style={styles.upComings}>
          <Text style={styles.upcomingText}>Tomorrow's Task</Text>
          <FlatList
            data={upcomingTasks}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <UpcomingTaskItem
                title={item.title}
                description={item.description}
                status={item.status}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={styles.taskListView}>
          <Text style={styles.upcomingText}>Today's Task</Text>
          <View style={styles.filterContainer}>
            <TouchableOpacity
              onPress={() => filterTasks("All")}
              style={[
                styles.filterButton,
                activeTab === "All" && {
                  backgroundColor: colors.color.primary,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  activeTab === "All" && styles.activeFilterText,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => filterTasks("Pending")}
              style={[
                styles.filterButton,
                activeTab === "Pending" && {
                  backgroundColor: colors.color.primary,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  activeTab === "Pending" && styles.activeFilterText,
                ]}
              >
                Pending
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => filterTasks("In Progress")}
              style={[
                styles.filterButton,
                activeTab === "In Progress" && {
                  backgroundColor: colors.color.primary,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  activeTab === "In Progress" && styles.activeFilterText,
                ]}
              >
                In Progress
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => filterTasks("Done")}
              style={[
                styles.filterButton,
                activeTab === "Done" && {
                  backgroundColor: colors.color.primary,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  activeTab === "Done" && styles.activeFilterText,
                ]}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
          {filteredTasks.map((item) => (
            <TodayTaskItem
              key={item.id}
              title={item.title}
              description={item.description}
              status={item.status}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  homeView: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor:Colors.primary,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  profileView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userProfileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  details: {
    paddingLeft: 15,
  },
  mesText: {
    fontSize: 20,
    color: "white",
    //fontFamily:Fonts.BOLD
  },
  tasksText: {
    color: "white",
    //fontFamily:Fonts.MEDIUM,
  },
  taskSummaryView: {
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: -10,
    borderWidth: 1,
    borderColor: "green",
  },
  temp: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  taskSummaryCard: {
    // backgroundColor: Colors.secondary,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    paddingBottom: 10,
  },
  taskText: {
    fontSize: 14,
    padding: 10,
    color: "black",
    //fontFamily: Fonts.MEDIUM,
  },
  addView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  percentageText: {
    color: "black",
    //fontFamily: Fonts.MEDIUM,
  },
  upComings: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  upcomingText: {
    fontSize: 18,
    color: "black",
    marginHorizontal: 5,
    //fontFamily: Fonts.BOLD,
  },
  taskContainer: {
    marginHorizontal: 5,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#ffffff", // Set your card background color
    borderRadius: 10, // Adjust as needed
    padding: 15, // Adjust as needed
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
      },
    }),
  },
  taskTitle: {
    fontSize: 14,
    marginBottom: 5,
    //fontFamily: Fonts.BOLD,
  },
  taskDesc: {
    fontSize: 12,
    //fontFamily:Fonts.MEDIUM,
  },
  taskListView: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    //backgroundColor: Colors.secondary,
  },
  filterText: {
    color: "black",
    //fontFamily:Fonts.MEDIUM,
  },

  activeFilterText: {
    color: "#fff",
    //fontFamily:Fonts.MEDIUM,
  },
  statusCircle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pendingTask: {
    width: 15,
    height: 15,
    backgroundColor: "red",
    borderRadius: 25,
  },
  statusDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
