import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay
} from "@chakra-ui/react";
import React, { memo, VFC } from "react";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  oncClickHome: () => void;
  oncClickUserManagement: () => void;
  oncClickSetting: () => void;
};

export const MenuDrawer: VFC<Props> = memo((props) => {
  const {
    onClose,
    isOpen,
    oncClickHome,
    oncClickUserManagement,
    oncClickSetting
  } = props;
  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            <Button w="100%" onClick={oncClickHome}>
              TOP
            </Button>
            <Button w="100%" onClick={oncClickUserManagement}>
              ユーザー一覧
            </Button>
            <Button w="100%" onClick={oncClickSetting}>
              設定
            </Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
