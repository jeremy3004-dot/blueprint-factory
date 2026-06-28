"use client";

import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";

import { analytics, initAnalytics } from "@/lib/analytics";

function AnalyticsRouteListener() {
  const pathname = usePathname();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    analytics.pageViewed(pathname);
  }, [pathname]);

  return null;
}

export function AnalyticsProvider() {
  return (
    <Suspense fallback={null}>
      <AnalyticsRouteListener />
    </Suspense>
  );
}

export function AdminLoginAnalytics() {
  useEffect(() => {
    analytics.adminLoginViewed();
  }, []);

  return null;
}
