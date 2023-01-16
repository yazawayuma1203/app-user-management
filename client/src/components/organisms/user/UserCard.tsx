import { Box, Image, Stack, Text } from "@chakra-ui/react";
import React, { memo, FC } from "react";

type Props = {
  id: number;
  userIconName: string;
  userName: string;
  fullName: string;
  onClick: (id: number) => void;
};

export const UserCard: FC<Props> = memo((props) => {
  const { id, userIconName, userName, fullName, onClick } = props;
  return (
    <Box
      w="260px"
      h="260px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
      onClick={() => onClick(id)}
    >
      <Stack textAlign="center">
        <Image
          borderRadius="full"
          boxSize="160px"
          src={userIconName ? `${process.env.PUBLIC_URL}/${userIconName}`: `${process.env.PUBLIC_URL}/noimage.jfif`}
          alt={userName}
          m="auto"
        />
        <Text fontSize="lg" fontWeight="bold">
          {userName}
        </Text>
        <Text fontSize="sm" color="gray">
          {fullName}
        </Text>
      </Stack>
    </Box>
  );
});
