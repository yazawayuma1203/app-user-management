import {
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  ButtonGroup
} from "@chakra-ui/react";
import axios from "axios";
import React, { ChangeEvent, memo, useState, FC } from "react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useMessage } from "../../../hooks/useMessage"


type Props = {
  isOpen: boolean;
  isAdmin?: boolean;
  onClose: () => void;
};

export const UserDetailModalAdd: FC<Props> = memo((props) => {
  const { isOpen, onClose, isAdmin = true } = props;

  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { showMessage } = useMessage();

  let isUsernameError = false;
  let usernameErrorMessage = "";

  let isNameError = false;
  let nameErrorMessage = "";

  let isEmailError = false;
  let emailErrorMessage = "";

  let isPhoneError = false;
  let phoneErrorMessage = "";

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) =>
    setUserName(e.target.value);
    if (username === "") {
      isUsernameError = true;
      usernameErrorMessage = "名前を入力してください";
    } else if (username.length > 255) {
      isUsernameError = true;
      usernameErrorMessage = "文字数は255字以内にしてください";
    } else {
      isUsernameError = false;
      usernameErrorMessage = "";
    };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
    if (name === "") {
      isNameError = true;
      nameErrorMessage = "フルネームを入力してください";
    } else if (name.length > 255) {
      isNameError = true;
      nameErrorMessage = "文字数は255字以内にしてください";
    } else {
      isNameError = false;
      nameErrorMessage = "";
    };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
    const mailPattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
    if (email === "") {
      isEmailError = true;
      emailErrorMessage = "MAILを入力してください";
    } else if (!(mailPattern.test(email))) {
      isEmailError = true;
      emailErrorMessage = "正しい形式で入力してください";
    } else {
      isEmailError = false;
      emailErrorMessage = "";
    };

  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) =>
    setPhone(e.target.value);
    const telPattern = /^0[789]0-[0-9]{4}-[0-9]{4}$/;
    if (phone === "") {
      isPhoneError = true;
      phoneErrorMessage = "携帯電話番号を入力してください";
    } else if (!(telPattern.test(phone))) {
      isPhoneError = true;
      phoneErrorMessage = "正しい形式で入力してください";
    } else {
      isPhoneError = false;
      phoneErrorMessage = "";
    };

  const onClickAdd = () => {
    const data ={
      username: username,
      name: name,
      email: email,
      phone: phone,
    };
    axios.post("http://localhost:3001/api/insert/user", data)
    .then(()=> {
      showMessage({ title: "正常に追加されました", status: "success" });
      window.location.reload();
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset={"slideInBottom"}
    >
      <ModalOverlay>
        <ModalContent pb={2}>
          <ModalHeader>ユーザー追加</ModalHeader>
          <ModalCloseButton />
          <ModalBody mx={4}>
            <Stack spacing={4}>
              <FormControl isInvalid={isUsernameError}>
                <FormLabel>名前</FormLabel>
                <Input
                  value={username}
                  onChange={onChangeUserName}
                  isReadOnly={!isAdmin}
                />
                {isUsernameError ? (
                  <FormErrorMessage>{usernameErrorMessage}</FormErrorMessage>
                ) : (
                  <></>
                )
                }
              </FormControl>
              <FormControl isInvalid={isNameError}>
                <FormLabel>フルネーム</FormLabel>
                <Input
                  value={name}
                  onChange={onChangeName}
                  isReadOnly={!isAdmin}
                />
                {isNameError ? (
                  <FormErrorMessage>{nameErrorMessage}</FormErrorMessage>
                ) : (
                  <></>
                )
                }
              </FormControl>
              <FormControl isInvalid={isEmailError}>
                <FormLabel>メールアドレス</FormLabel>
                <Input
                  value={email}
                  onChange={onChangeEmail}
                  isReadOnly={!isAdmin}
                />
                {isEmailError ? (
                  <FormErrorMessage>{emailErrorMessage}</FormErrorMessage>
                ) : (
                  <></>
                )
                }
              </FormControl>
              <FormControl isInvalid={isPhoneError}>
                <FormLabel>携帯電話番号(11桁・ハイフンあり)</FormLabel>
                <Input
                  value={phone}
                  onChange={onChangePhone}
                  isReadOnly={!isAdmin}
                />
                {isPhoneError ? (
                  <FormErrorMessage>{phoneErrorMessage}</FormErrorMessage>
                ) : (
                  <></>
                )
                }
              </FormControl>
            </Stack>
          </ModalBody>
          {isAdmin && (
            <ModalFooter>
              <ButtonGroup spacing={2}>
              <PrimaryButton bg="teal.400" disabled={isUsernameError || isNameError || isEmailError || isPhoneError} onClick={onClickAdd}>追加</PrimaryButton>
              </ButtonGroup>
            </ModalFooter>
          )}
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
});
