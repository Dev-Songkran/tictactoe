import { useGame } from "@/src/store";
import {
  Box,
  Button,
  Center,
  Group,
  Overlay,
  Stack,
  Text,
  Transition,
} from "@mantine/core";
import { map } from "lodash";
import { useCallback, useEffect } from "react";
import Square from "./Square";
import { checkWinner } from "@/src/utils/winner";
import { IconCircle, IconReload, IconX } from "@tabler/icons";
import useStyles from "@/src/styles";
import { mutate } from "swr";
import useAuth from "@/src/utils/auth";

const Board = () => {
  const { auth } = useAuth();

  const { currentBoard, setWinner, winner, reset } = useGame();
  const { classes } = useStyles();

  useEffect(() => {
    const winner = checkWinner(currentBoard) as string;
    setWinner(winner, () =>
      mutate(`/api/getPlayerData?username=${auth?.user?.username}`)
    );
  }, [currentBoard, auth?.user?.username, setWinner]);

  return (
    <Box pos="relative">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: " repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        {map(currentBoard, (index: number | string, key) => (
          <Square mark={index} key={key} />
        ))}
      </Box>
      <Transition transition="pop" mounted={!!winner}>
        {(styles) => (
          <Center w="100%" h="100%" pos="absolute" inset={0}>
            <Box style={styles} pos="relative" sx={{ zIndex: 500 }}>
              {!!winner ? (
                <Stack>
                  <Group align="center" spacing="xs">
                    {winner === "x" ? (
                      <Box component={IconX} stroke={6} />
                    ) : null}
                    {winner === "o" ? (
                      <Box component={IconCircle} stroke={6} />
                    ) : null}
                    <Text
                      mx={winner === "draw" ? "auto" : "0"}
                      fw={600}
                      ta="center"
                    >
                      {winner === "draw" ? "DRAW!" : !!winner ? "WINS!" : ""}
                    </Text>
                  </Group>
                  <Button
                    onClick={() => {
                      reset();
                    }}
                    className={classes.buttonPrimary}
                    radius="xl"
                    ml="auto"
                    size="xs"
                    leftIcon={<IconReload />}
                  >
                    Retry
                  </Button>
                </Stack>
              ) : null}
            </Box>

            <Overlay blur={10} radius={12} />
          </Center>
        )}
      </Transition>
    </Box>
  );
};

export default Board;
