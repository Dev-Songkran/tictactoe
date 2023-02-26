import {
  AppShell,
  Avatar,
  Box,
  Center,
  Group,
  Header,
  Loader,
  Menu,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { FC, ReactNode, useEffect } from "react";
import { IconLogout } from "@tabler/icons";
import useAuth, { signOut } from "@/src/utils/auth";
import Router from "next/router";

interface LayoutProps {
  children: ReactNode | ReactNode[];
}

const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;

  const { auth, isLoading } = useAuth();

  useEffect(() => {
    if (!auth?.isLoggedIn && !isLoading) Router.push(`/login`);
  }, [auth, isLoading]);

  if (!auth?.isLoggedIn)
    return (
      <Center h="100vh">
        <Loader variant="dots" />
      </Center>
    );

  return (
    <AppShell
      padding="md"
      header={
        <Header
          height={60}
          py="sm"
          px="lg"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Text fz={20} fw={800} color="#526ad9" mr="auto">
            Tic Tac Toe
          </Text>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <UnstyledButton>
                <Group>
                  <Avatar
                    size={40}
                    color="blue"
                    src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                    alt={auth?.user?.username}
                  />
                  <Box>
                    <Text>{auth?.user?.username}</Text>
                    <Text size="xs" color="dimmed">
                      Welcome
                    </Text>
                  </Box>
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={signOut} icon={<IconLogout size={14} />}>
                Log out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Header>
      }
      styles={{
        main: {
          backgroundColor: "#f5f6f8",
        },
      }}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
