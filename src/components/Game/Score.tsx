import { Badge, Box, Grid, Group, Stack, Text } from "@mantine/core";
import { IconCircle, IconEqual, IconX } from "@tabler/icons";
import { map } from "lodash";
import { FC } from "react";

interface Score {
  player: string;
  win: number;
}
interface ScoreProps {
  data?: {
    score: Score[];
    draw: 0;
  };
}
const Score: FC<ScoreProps> = ({ data }) => {
  return (
    <Grid gutter={5}>
      {map(data?.score, (item: Score, index: number) => (
        <Grid.Col span={4} key={index}>
          <Group noWrap spacing="xs">
            <Text
              component={item.player === "x" ? IconX : IconCircle}
              color={item.player === "x" ? "green" : "yellow"}
              stroke={5}
            />
            <Badge color={item.player === "x" ? "green" : "yellow"}>
              Win(s): {item.win}
            </Badge>
          </Group>
        </Grid.Col>
      ))}

      <Grid.Col span={4}>
        <Group noWrap spacing="xs">
          <Text component={IconEqual} color="blue" stroke={5} />

          <Badge color="blue">Draw: {data?.draw}</Badge>
        </Group>
      </Grid.Col>
    </Grid>
  );
};
export default Score;
