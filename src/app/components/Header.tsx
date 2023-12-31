'use client'

import {
  Box,
  Flex,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "./common";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FaBars as HamburgerIcon, FaTimes as CloseIcon } from 'react-icons/fa';
import Link from 'next/link';
import { ChangeEvent } from "react";

interface NavProps {
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const NavLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <Link href={href} passHref>
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}>
      {children}
    </Box>
  </Link>
);


export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "List", href: "/list" },
  ];
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'flex-end'}>
          <Box>Logo</Box>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
          <Box>
      <Flex p={4}>
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
            <NavLink key={index} href={item.href}>
              <Button w="100%" my={2} onClick={onClose}>
                {item.name}
              </Button>
            </NavLink>
          ))}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
        </Flex>


      </Box>

    </>
  )
}