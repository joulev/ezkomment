import "client-only";

import useSWR from "swr";
import { internalSWRGenerator } from "~/app/(auth)/internal-fetch";
import { Notification } from "~/types/server";

export default function useNotifications() {
    const { data, mutate } = useSWR(
        "/api/user/notifications",
        internalSWRGenerator<Notification[]>()
    );
    return { notifications: data ?? [], mutate };
}
