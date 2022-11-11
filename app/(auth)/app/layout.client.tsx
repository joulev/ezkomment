"use client";

import { useState } from "react";
import Notifications from "./components/notification.client";
import { NotificationShowSetter } from "./notification";
import { UserContext } from "./user";
import { ClientUser, Notification } from "~/types/server";

type Props = {
  user: ClientUser;
  notifications: Notification[];
};

export default function AppLayoutClient({
  user,
  notifications,
  children,
}: React.PropsWithChildren<Props>) {
  const [showNotif, setShowNotif] = useState(false);
  return (
    <NotificationShowSetter.Provider value={setShowNotif}>
      <UserContext.Provider value={{ ...user, notifications }}>
        {children}
        <Notifications
          show={showNotif}
          onClose={() => setShowNotif(false)}
          notifications={notifications}
        />
      </UserContext.Provider>
    </NotificationShowSetter.Provider>
  );
}
