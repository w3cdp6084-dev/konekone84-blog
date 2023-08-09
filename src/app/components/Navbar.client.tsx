'use client'
import {
  Box,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  IconButton,
  Button,
} from "./common";
import { FaBars as HamburgerIcon, FaTimes as CloseIcon } from 'react-icons/fa';

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const menuItems = ["Home", "About", "Contact", "Services"];

  return (
    <Box>
      <Flex justify="space-between" align="center" p={4}>
        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={isOpen ? onClose : onOpen}
          aria-label="Menu"
        />
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Navigation</DrawerHeader>
            <DrawerBody>
              {menuItems.map((item, index) => (
                <Button key={index} w="100%" my={2} onClick={onClose}>
                  {item}
                </Button>
              ))}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};
