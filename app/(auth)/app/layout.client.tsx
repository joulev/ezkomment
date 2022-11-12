"use client";

import { useEffect, useState } from "react";
import { useLoadingState } from "~/app/loading-state";
import Notifications from "./components/notification.client";
import { NotificationContext, useNotificationsInit } from "./notification";
import { UserContext } from "./user";
import { ClientUser } from "~/types/server";

type Props = { user: ClientUser };

export default function AppLayoutClient({ user, children }: React.PropsWithChildren<Props>) {
  const [showNotif, setShowNotif] = useState(false);
  const data = useNotificationsInit();
  const { setLoading } = useLoadingState();
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);
  return (
    <NotificationContext.Provider value={{ ...data, setShow: setShowNotif }}>
      <UserContext.Provider value={user}>
        {children}
        <Notifications show={showNotif} onClose={() => setShowNotif(false)} />
      </UserContext.Provider>
    </NotificationContext.Provider>
  );
}
