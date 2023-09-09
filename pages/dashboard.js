import {
  Box,
  Container,
  Button,
  Text,
  Flex,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl, FormLabel, Input,
  ModalCloseButton,
} from '@chakra-ui/react'
import Navbar from "../components/Navbar";
import { useDisclosure } from '@chakra-ui/react'
import { useConnect } from "../components/ConnectProvider";
import Router from "next/router";
import { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import { useToast } from '@chakra-ui/react'

export default function Dashboard() {
  const { walletAddress, contract, loading } = useConnect();
  const [ myItems, setMyItems ] = useState([]);
  const toast = useToast()
  const toastIdRef = useRef()

  let status = {
    0: "OPEN",
    1: "PENDING",
    2: "DELIVERY",
    3: "SETTLED",
    4: "REFUNDED",
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const amount = useRef(null)

  async function creatEscrow() {
    console.log('Creating service request...', initialRef.current.value);
    if (ethereum && walletAddress && contract) {
      const createTxn = await contract.createItem(initialRef.current.value, { value: ethers.parseEther(amount.current.value) });
      toastIdRef.current = toast({
        title: 'Creating Item',
        description: createTxn.hash,
        status: 'info',
        duration: null,
        isClosable: false,
      })
      onClose();
      await createTxn.wait();
      if (toastIdRef.current) {
        toast.update(toastIdRef.current, { title: 'Item Created!', description: createTxn.hash, status: 'success', isClosable: true, duration: 5000 })
      }
    }
  }

  async function getAllEscrows() {
    if (ethereum && walletAddress && contract) {
      const myEscrows = await contract.getItems();
      setMyItems(myEscrows);
    }
  }

  async function confirmD(id) {
    if (ethereum && walletAddress && contract) {
      const createTxn = await contract.confirmDelivery(id, true, { value: ethers.parseEther("0.0") });
      toastIdRef.current = toast({
        title: 'Confirming Delivery',
        description: createTxn.hash,
        status: 'info',
        duration: null,
        isClosable: false,
      })
      await createTxn.wait();
      if (toastIdRef.current) {
        toast.update(toastIdRef.current, { title: 'Delivery Confirmed', description: createTxn.hash, status: 'success', isClosable: true, duration: 5000 })
      }
    }
  }
  useEffect(() => {
    if (walletAddress.length < 1) {
      Router.push("/");
    }
  }, []);

  useEffect(() => {
    getAllEscrows();
  }, [ contract ]);

  if (loading) {
    return <Text>Loading...</Text>
  }
  return (
    <Box background={"black"} minH={"100vh"}>
      <Container maxW="container.xl" py={6}>
        <Navbar walletAddress={walletAddress} />

        <Flex px={8} my={6} justifyContent={"space-between"} alignItems={"center"}>
          <Text fontSize={"3xl"} fontWeight={"bold"} color={"white"}>
            My Requested Services</Text>
          <Button onClick={onOpen}>Request Service</Button>
          <Modal
            initialFocusRef={initialRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create a new item</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl pb={6}>
                  <FormLabel>Purpose</FormLabel>
                  <Input ref={initialRef} placeholder='Enter purpose of the item.' />
                </FormControl>
                <FormControl>
                  <FormLabel>Amount</FormLabel>
                  <Input ref={amount} placeholder='Enter Amount in Matic' />
                  <Text fontSize={"sm"} color={"gray.400"}>If purpose not fulfilled, amount will be reverted back in 7 days.
                  </Text>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={creatEscrow}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>

        {/* {myItems && myItems.length > 0 && <Text color={"white"}>You have {myItems.length} escrows.</Text>} */}
        {myItems && myItems.length > 0 && <SimpleGrid columns={3} spacing={6} pt={14}>
          {myItems.map((item, index) => {
            if (item.owner.toLowerCase() === walletAddress.toLowerCase()) {
              return <Flex key={index}
                width={"100%"} background={"gray.900"} px={8}
                py={6} rounded={"xl"}
                alignItems={"start"}
                flexDirection={"column"}
              >
                <Flex justifyContent={"space-between"} alignItems={"center"} width={"100%"}>
                  <Text fontSize={"2xl"} fontWeight={"bold"} color={"white"}>{item.purpose}</Text>
                  <Badge colorScheme="green">{status[ item.status ]}</Badge>
                </Flex>
                <Text fontSize={"4xl"} color={"gray.400"} mt={10}>{ethers.formatEther(item.amount)} MATIC</Text>
                {item.provided && !item.confirmed &&
                  <Button mt={10} onClick={() => confirmD(item.itemId)}>Confirm Delivery</Button>
                }
                {item.status >= 1 ? <Text fontSize={"sm"} color={"gray.400"} mt={2}>Provider {item.provider.substring(0, 6) + "..." + item.provider.slice(-4)}</Text> : <Text fontSize={"sm"} color={"gray.400"} mt={2}>Waiting for provider</Text>}
              </Flex>
            }
          })}
        </SimpleGrid>}

      </Container>
    </Box>
  );
}
