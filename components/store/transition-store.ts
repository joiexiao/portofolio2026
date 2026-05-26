"use client"

import { create } from "zustand"

export type Phase = "idle" | "enter" | "exit"

interface TransitionStore {
  phase: Phase
  setPhase: (phase: Phase) => void
}

export const useTransitionStore = create<TransitionStore>((set) => ({
  phase: "idle",
  setPhase: (phase) => set({ phase }),
}))