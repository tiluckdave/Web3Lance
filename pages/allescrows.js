import {
    Box,
    Container,
    Text,
    Flex,
    SimpleGrid,
    Badge,
    Button,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { useConnect } from "../components/ConnectProvider";
import { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import Router from "next/router";
import { useToast } from '@chakra-ui/react'

export default function Dashboard() {
    const { walletAddress, contract, loading } = useConnect();
    const [ allItems, setAllItems ] = useState([]);
    const toast = useToast()
    const toastIdRef = useRef()

    let status = {
        0: "OPEN",
        1: "PENDING",
        2: "DELIVERY",
        3: "SETTLED",
        4: "REFUNDED",
    }

    async function getAllEscrows() {
        if (ethereum && walletAddress && contract) {
            const myEscrows = await contract.getItems();
            setAllItems(myEscrows);
        }
    }

    async function provideItem(id) {
        if (ethereum && walletAddress && contract) {
            const createTxn = await contract.provideItem(id, walletAddress, { value: ethers.parseEther("0.0") });
            toastIdRef.current = toast({
                title: 'Providing Item',
                description: createTxn.hash,
                status: 'info',
                duration: null,
                isClosable: false,
            })
            await createTxn.wait();
            if (toastIdRef.current) {
                toast.update(toastIdRef.current, { title: 'Provided Item', description: createTxn.hash, status: 'success', isClosable: true, duration: 5000 })
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
                        All Freelance Projects</Text>
                </Flex>
                {allItems && allItems.length > 0 && <SimpleGrid columns={3} spacing={6} pt={14}>
                    {allItems.map((item, index) => {
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
                            <Text fontSize={"4xl"} color={"gray.400"} mt={4}>{ethers.formatEther(item.amount)} MATIC</Text>
                            {
                                walletAddress.toLowerCase() == item.owner.toLowerCase() ? (<Text fontSize={"sm"} color={"gray.400"} mt={2}>You requested this service.</Text>) : (<>
                                    {item.status > 0 && <Text fontSize={"sm"} color={"gray.400"} mt={2}>Provider {item.provider.substring(0, 6) + "..." + item.provider.slice(-4)}</Text>}
                                    {item.status == 0 && <Button mt={10} onClick={() => provideItem(item.itemId)}>Request to Provide</Button>}
                                    <Text fontSize={"sm"} color={"gray.400"} mt={2}>Service Requested by {item.owner.substring(0, 6) + "..." + item.owner.slice(-4)}</Text></>)
                            }
                        </Flex>
                    })}
                </SimpleGrid>}

            </Container>
        </Box>
    );
}
