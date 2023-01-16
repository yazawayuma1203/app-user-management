import React, { ChangeEvent, memo, useState, useEffect, FC } from "react";
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router-dom";
import { gapi } from 'gapi-script';
import { useMessage } from "../../hooks/useMessage";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { UseAuth } from "../../hooks/useAuth";

const CLIENT_ID = "765410884034-um1ou7c2dluvgj50ke0urf3k20irpho2.apps.googleusercontent.com";

export const Login: FC = memo(() => {
  const [userId, setUserId] = useState("");

  const { login, loading } = UseAuth();
  const { showMessage } = useMessage();

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);

  const onCLickLogin = () => login(userId);

  const history = useHistory();
  const success = () => {
    showMessage({ title: "ログインしました", status: "success" });
    history.push("/home");
  };

  const error = () => {
    showMessage({ title: "ログインできません", status: "error" });
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ユーザー管理アプリ
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input
            placeholder="ユーザーID"
            value={userId}
            onChange={onChangeUserId}
          />
          <PrimaryButton
            bg="teal.400"
            loading={loading}
            disabled={userId === ""}
            onClick={onCLickLogin}
          >
            ログイン
          </PrimaryButton>
          <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Googleアカウントでログイン"
          onSuccess={success}
          onFailure={error}
          cookiePolicy={"single_host_origin"}
          />
        </Stack>
      </Box>
    </Flex>
  );
});
