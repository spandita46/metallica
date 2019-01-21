import openSocket from "socket.io-client";
import { getNotificationServiceURL, getUserSessionToken } from "./appSession";

const socket = openSocket(getNotificationServiceURL());

function subscribeToNotifications(
  eventToSubscribe,
  callback,
  isForAll = false
) {
  socket.on(eventToSubscribe, data => {
    if (
      (getUserSessionToken() &&
        data.userToken &&
        getUserSessionToken() !== data.userToken) ||
      isForAll
    ) {
      callback(data);
    }
  });
}

export default subscribeToNotifications;
