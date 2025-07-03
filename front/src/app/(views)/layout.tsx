"use client";

import Script from "next/script";
import LayoutManager from "@/components/LayoutManager";
import ClientWrapper from "@/components/ClientWrapper";
import { useAuthStore } from "@/stores/authStore";
import { useChatStore } from "@/stores/chatStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/UI/Loader";

export default function ViewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isInitialized} = useAuthStore();
  const pathname = usePathname();
  const [isRouting, setIsRouting] = useState(false);

  const socket = useChatStore((s) => s.socket);
  const listenForNotifications = useNotificationStore(
    (s) => s.listenForNotifications
  );

  useEffect(() => {
    if (socket) {
      listenForNotifications(socket);
    }
  }, [socket, listenForNotifications]);

  const isChatRoom = pathname === "/user/chat";
  const isDetailProduct = pathname.startsWith("/shop/products/");

  useEffect(() => {
    setIsRouting(true);
    const timeout = setTimeout(() => setIsRouting(false), 500);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {!isInitialized && <ClientWrapper />}
      {(!isInitialized || isRouting) && <Loader />}

      {isInitialized && !isRouting && (
        <LayoutManager
          showBreadcrumb={!isChatRoom && !isDetailProduct}
          showContainer={!isChatRoom}
        >
          {children}
          <div id="portal-root" />
        </LayoutManager>
      )}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js" />
    </>
  );
}
