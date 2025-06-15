"use client";

import { usePathname } from "next/navigation";
import React from "react";

const excludePaths = [""];

export default function ExcludedWrapper({
    children
}: {
    children: React.ReactNode
}) {
    const path = usePathname();
    if (!excludePaths.includes(path))
        return children
};