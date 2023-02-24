import { useGame } from "@/src/store";
import { ActionIcon, Box, Text } from "@mantine/core";
import { IconCircle, IconX } from "@tabler/icons";
import { FC } from "react";

interface SquareProps {
  mark?: string | number;
}

const Square: FC<SquareProps> = (props) => {
  const { mark } = props;
  const { updateBoard, turn, winner } = useGame();

  const handleMark = () => {
    if (typeof mark !== "string")
      updateBoard({ index: Number(mark), turn: turn as string });
  };

  return (
    <ActionIcon
      onClick={handleMark}
      radius={12}
      variant="transparent"
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          !!winner && typeof mark === "number"
            ? theme.colors["gray"][3]
            : "white",
        padding: "3.8rem",
      })}
      disabled={!!winner}
    >
      <Box w={40} h={40}>
        {mark === "x" ? (
          <Box
            sx={(theme) => ({ color: theme.colors["green"][6] })}
            component={IconX}
            size={40}
            stroke={5}
          />
        ) : null}
        {mark === "o" ? (
          <Box
            sx={(theme) => ({ color: theme.colors["yellow"][6] })}
            component={IconCircle}
            size={40}
            stroke={5}
          />
        ) : null}
      </Box>
    </ActionIcon>
  );
};

export default Square;
