/*eslint-disable react-hooks/exhaustive-deps */

import {
  Box,
  Center,
  Spinner,
  useDisclosure,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import React, { memo, useState, useCallback, useEffect, FC } from "react";

import { UserCard } from "../organisms/user/UserCard";
import { UserDetailModal } from "../organisms/user/UserDetailModal";
import { UserDetailModalAdd } from "../organisms/user/UserDetailModalAdd";
import { useAllUsers } from "../../hooks/useAllUsers";
import { useSelectUser } from "../../hooks/useSelectUser";
import { useLoginUser } from "../../hooks/useLoginUser";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const UserManagement: FC = memo(() => {
  const { getUsers, loading, users } = useAllUsers();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { onSelectUser, selectedUser } = useSelectUser();
  const { loginUser } = useLoginUser();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => getUsers(), []);

  const onClickUser = useCallback(
    (id: number) => {
      setIsUpdate(true);
      setIsAdd(false);
      onSelectUser({ id, users, onOpen });
    },
    [users, onSelectUser, onOpen]
  );

  const onClickAdd = useCallback(
    () => {
      setIsAdd(true);
      setIsUpdate(false);
      onOpen();
    },
    []
  );

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                id={user.id}
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
                onClick={onClickUser}
              />
            </WrapItem>
          ))}
          <Box
            w="260px"
            h="260px"
          >
            <Center h="260px">
              <PrimaryButton bg="teal.400" onClick={onClickAdd}>ユーザー追加</PrimaryButton>
            </Center>
          </Box>
        </Wrap>
      )}
      {isUpdate && (
        <UserDetailModal
          user={selectedUser}
          isOpen={isOpen}
          onClose={onClose}
          isAdmin={loginUser?.isAdmin}
        />
      )}
      {isAdd && (
        <UserDetailModalAdd
          isOpen={isOpen}
          onClose={onClose}
          isAdmin={loginUser?.isAdmin}
        />
      )}
    </>
  );
});
