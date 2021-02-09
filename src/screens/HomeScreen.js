import React, { useState, useRef } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Text,
  RefreshControl,
} from "react-native";
import { Colors } from "../helpers/Colors";
import Toast from "../components/Toast";
import { useFocusEffect } from "@react-navigation/native";
import useApi from "../hooks/Api";
import Icon from "react-native-vector-icons/Ionicons";
import { Texts } from "../helpers/Texts";
import useAuth from "../hooks/Auth";
import { Env } from "../Env";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import GeneralStatusBarColor from "../components/StatusBarColor";

const screenHeight = Math.round(Dimensions.get("window").height);

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export function HomeScreen({ navigation }) {

  const [loading, setLoading] = useState(false);
  const api = useApi({ navigation });
  const dispatch = useDispatch();
  const refNotification = useRef();
  const { getFcmToken } = useAuth();
  const notifications = useSelector((state) => state).notificationReducer;
  const user = useSelector((state) => state).userReducer;
  const [refreshing, setRefreshing] = React.useState(false);
  const [fcm, setFcm] = useState();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  const get = async () => {

  };
  useFocusEffect(
    React.useCallback(() => {
      Colors.theme = Colors.primary;
      get();
    }, []),
  );

  return (
    <>
      {loading ? (
          <Loading />

        )
        :
        (
          <View style={styles.container}>
            <Toast ref={refNotification} />

            <GeneralStatusBarColor backgroundColor={Colors.primary}
                                   barStyle="light-content" />
            {/*<StatusBar*/}
            {/*  backgroundColor={Colors.primary}*/}
            {/*  barStyle="light-content"*/}
            {/*/>*/}
            <View style={{
              backgroundColor: "#fafafa",
              borderBottomWidth: 1, borderColor: "#e0dede",
            }}>
              <View style={{ flexDirection: "row", padding: 20, backgroundColor: Colors.primary }}>
                <TouchableOpacity style={{ justifyContent: "center" }}
                                  onPress={() => navigation.openDrawer()}>
                  <Icon name={"menu-outline"} style={{}} size={35} color={"white"} />
                </TouchableOpacity>
                <View style={{ flex: 1, marginLeft: 5, justifyContent: "flex-start", paddingVertical: 5 }}>
                  <Text style={{ color: "white", fontSize: 23 }}>Template</Text>
                </View>


              </View>
            </View>
            <ScrollView style={{ paddingHorizontal: 3 }} refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
              <Text style={{ fontSize: 40 }}>Conteudo do APP</Text>
            </ScrollView>
          </View>
        )}
    </>

  );
}

const styles = StyleSheet.create({
  itemList: {
    flex: 1,
    margin: 3,
    height: 150,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 3,
  },

  subtitle: {
    color: Colors.secondary,
    fontSize: Texts.subtitle,

  },
  bg: {
    position: "absolute",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "white",
  },
  logo: {
    width: "100%",
    resizeMode: "contain",
    flex: 1,
  },
});
