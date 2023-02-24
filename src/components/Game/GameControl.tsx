import { useGame } from "@/src/store";
import useStyles from "@/src/styles";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Grid,
  Group,
  Paper,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconCircle, IconReload, IconX } from "@tabler/icons";
import { FC } from "react";

interface GameControlProps {
  total?: number;
}
const GameControl: FC<GameControlProps> = ({ total }) => {
  const theme = useMantineTheme();
  const { turn } = useGame();

  return (
    <Grid align="center">
      <Grid.Col span={6}>
        <Group noWrap spacing="xs">
          <Badge color="blue">Record: {total} Games</Badge>
        </Group>
      </Grid.Col>
      <Grid.Col span={6} ta="right">
        <Button
          radius="xl"
          ml="auto"
          size="xs"
          component="div"
          leftIcon={
            <Box
              component={turn == "x" ? IconX : IconCircle}
              stroke={5}
              size={16}
            />
          }
          disabled
          sx={{
            background: `${
              theme.colors[turn === "x" ? "green" : "yellow"][1]
            } !important`,
            color: `${
              theme.colors[turn === "x" ? "green" : "yellow"][6]
            } !important`,
          }}
        >
          TURN
        </Button>
      </Grid.Col>
    </Grid>
  );
};

export default GameControl;
