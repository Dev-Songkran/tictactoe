import { Box, Center, Container, Paper, Stack } from "@mantine/core";
import Board from "./Board";
import Score from "./Score";
import GameControl from "./GameControl";
import useSWR from "swr";
import useAuth from "@/src/utils/auth";
import { useGame } from "@/src/store";
import { useCallback, useEffect, useMemo } from "react";

const Game = () => {
  const { auth } = useAuth();

  const { setFirstPlayer } = useGame();

  const { data } = useSWR(
    !!auth ? `/api/getPlayerData?username=${auth?.user?.username}` : null
  );

  const fisrt = useCallback(() => {
    console.log("first ??");
    setFirstPlayer(data?.last_first_player === "x" ? "o" : "x");
  }, [setFirstPlayer, data]);

  useEffect(() => {
    fisrt();
  }, [fisrt]);

  return (
    <Center h="100%" px="lg" mx="auto" sx={{ maxWidth: "460px" }}>
      <Stack>
        <Score data={{ score: data?.data, draw: data?.draw }} />
        <Board />
        <GameControl total={data?.game_count} />
      </Stack>
    </Center>
  );
};

export default Game;
