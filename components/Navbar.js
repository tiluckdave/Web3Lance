import { Flex, Heading, Text, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

export default function Navbar({ walletAddress}) {

    return (
        <Flex
          width={"100%"} background={"gray.900"} px={8}
          py={6} rounded={"xl"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexDirection={"row"}
        >
            <Link href={"/"} >
          <Heading color={"white"}>Web3Lance</Heading>
            </Link>
            <Link href={"/dashboard"} >
            <ChakraLink  color={"gray.400"}>Dashboard</ChakraLink></Link>
          <Link href={"/allescrows"} >
          <ChakraLink  color={"gray.400"}>All Projects</ChakraLink></Link>
          <Link href={"/applied"} >
          <ChakraLink  color={"gray.400"}>Applied Projects</ChakraLink></Link>
          <Flex alignItems={"end"} flexDirection={"column"}>
            <Text color={"gray.400"}>Welcome</Text>
            <Text color={"gray.200"}>{walletAddress.substring(0,6) + "..." + walletAddress.slice(-4)}</Text>
          </Flex>
        </Flex>
    )
}