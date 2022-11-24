import { Button } from "@chakra-ui/react";
import React, { memo, ReactNode, FC } from "react";

type Props = {
  bg:string;
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
};

export const PrimaryButton: FC<Props> = memo((props) => {
  const { bg, children, disabled = false, loading = false, onClick } = props;
  return (
    <Button
      bg={bg}
      color="white"
      _hover={{ opacity: 0.8 }}
      disabled={disabled || loading}
      isLoading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
