"use client";

import { useEffect, useState } from "react";
import { useLoadingState } from "~/app/loading-state";
import Notifications from "./components/notification.client";
import { NotificationShowSetter } from "./notification";
import { UserContext } from "./user";
import { ClientUser } from "~/types/server";

type Props = { user: ClientUser };

export default function AppLayoutClient({ user, children }: React.PropsWithChildren<Props>) {
  const [showNotif, setShowNotif] = useState(false);
  const { setLoading } = useLoadingState();
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);
  return (
    <NotificationShowSetter.Provider value={setShowNotif}>
      <UserContext.Provider value={user}>
        {children}
        <Notifications show={showNotif} onClose={() => setShowNotif(false)} />
      </UserContext.Provider>
    </NotificationShowSetter.Provider>
  );
}
