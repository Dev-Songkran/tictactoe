import axios from "axios";
import { mutate } from "swr";
import { create } from "zustand";

interface Game {
  turn: string;
  currentBoard: (number | string)[];
  winner: string | null;
  firstPlayer: string;
  setFirstPlayer: (payload: string) => void;
  updateBoard: (payload: { index: number; turn: string }) => void;
  setWinner: (payload: string | null, cb: () => Promise<void>) => void;
  reset: () => void;
}
export const useGame = create<Game>()((set) => ({
  turn: "x",
  currentBoard: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  winner: null,
  firstPlayer: "x",
  setFirstPlayer: (payload) =>
    set((state) => ({ ...state, turn: payload, firstPlayer: payload })),
  updateBoard: (payload) =>
    set((state) => {
      const currentBoard = [...state.currentBoard];
      currentBoard[payload.index] = payload.turn;
      const turn = payload.turn === "x" ? "o" : "x";
      return { ...state, currentBoard, turn };
    }),
  setWinner: async (payload, callback) => {
    set((state) => ({ ...state, winner: payload }));
    if (payload !== null) {
      await axios.post(`/api/updateResult`, { player_win: payload });
      await callback();
    }
    return;
  },
  reset: () =>
    set((state) => {
      const currentBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      const winner = null;

      return { ...state, currentBoard, winner };
    }),
}));
