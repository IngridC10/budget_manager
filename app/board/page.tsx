"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const KanbanBoard = dynamic(() => import("./components/KanbanBoardComponent"), {
  ssr: false,
});

export default function BoardPage() {
  return <KanbanBoard />;
}
