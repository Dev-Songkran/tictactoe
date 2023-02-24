import {
  Box,
  Button,
  Card,
  Center,
  Container,
  Group,
  Loader,
  Overlay,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { FC, useEffect } from "react";
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import Link from "next/link";
import useAuth, { Auth, signIn, signUp } from "@/src/utils/auth";
import Router from "next/router";
import { showNotification } from "@mantine/notifications";

interface AuthProps {
  type: "signin" | "signup";
}

const AuthText = {
  signin: "Welcome",
  signup: "Registration",
};

const Auth: FC<AuthProps> = ({ type }) => {
  const { auth, isLoading } = useAuth();

  useEffect(() => {
    if (auth?.isLoggedIn && !isLoading) Router.push(`/`);
  }, [auth, isLoading]);

  const { onSubmit, getInputProps } = useForm<Auth>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: yupResolver(
      Yup.object().shape({
        username: Yup.string().required("กรุณากรอกข้อมูล"),
        password: Yup.string().required("กรุณากรอกข้อมูล"),
      })
    ),
  });

  if (!!auth?.isLoggedIn || !!isLoading)
    return (
      <Center h="100vh">
        <Loader variant="dots" />
      </Center>
    );

  return (
    <Box
      h="100vh"
      sx={{
        background: "rgba(91, 140, 232, 0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card p="lg" sx={{ width: 425 }}>
        <Box mb="lg">
          <Title mb={6} ta="center" fw="600" color="#526ad9">
            Tic Tac Toe
          </Title>
          <Text ta="center" color="#495057">
            {AuthText[type]}
          </Text>
        </Box>
        <Box
          component="form"
          onSubmit={onSubmit(type === "signin" ? signIn : signUp)}
        >
          <Stack>
            <TextInput
              label="Username"
              placeholder="Enter username"
              {...getInputProps("username")}
            />
            <TextInput
              label="Password"
              placeholder="Enter password"
              type="password"
              {...getInputProps("password")}
            />
            <Center>
              <Button
                component={Link}
                href={type == "signin" ? "/register" : "/login"}
                variant="subtle"
                sx={{
                  color: "#495057",
                  "&:hover": {
                    background: "transparent",
                  },
                }}
              >
                {type === "signin" ? "Register" : "Log In"}
              </Button>
              <Button
                type="submit"
                styles={{
                  root: {
                    background: "#5b73e8",
                    "&:hover": {
                      background: "#5b73e8",
                      opacity: 0.9,
                    },
                  },
                }}
              >
                {type === "signin" ? "Log In" : "Register"}
              </Button>
            </Center>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};
export default Auth;
