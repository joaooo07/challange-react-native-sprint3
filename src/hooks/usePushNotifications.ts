import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

if (Notifications.setNotificationHandler) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

export type UsePushReturn = {
  expoPushToken: string | null;
  permissionStatus: "granted" | "denied" | "undetermined";
  requestPermission: () => Promise<void>;
  sendLocalNotification: (title?: string, body?: string) => Promise<void>;
};

export default function usePushNotifications(): UsePushReturn {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<
    "granted" | "denied" | "undetermined"
  >("undetermined");

  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    checkPermission(); // apenas checa silenciosamente

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("📩 Notificação recebida:", notification);
      }
    );

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("👆 Interação com notificação:", response);
      });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  const checkPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setPermissionStatus(status);
    if (status === "granted") {
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token);
    }
  };

  const requestPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setPermissionStatus(status);

    if (status === "granted") {
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token);
      console.log("🔑 Expo Push Token:", token);
    } else {
      console.warn("🚫 Permissão negada para notificações");
    }
  };

  return { expoPushToken, permissionStatus, requestPermission, sendLocalNotification };
}


export async function sendLocalNotification(
  title = "Mottu Informa",
  body = "Patio de BMW na Unidade 1 está lotado"
) {
  await Notifications.scheduleNotificationAsync({
    content: { title, body, sound: true },
    trigger: null,
  });
}
