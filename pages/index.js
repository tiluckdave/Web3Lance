import { Box, Container, Stack, Text, Button, Flex } from "@chakra-ui/react";
import { useConnect } from "../components/ConnectProvider";
import { useEffect } from "react";
import Router from "next/router";

export default function Main() {
  const { connectWallet, loading, walletAddress, setLoading } = useConnect();
  setLoading(false);
  useEffect(() => {
    if (walletAddress) {
      Router.push("/dashboard");
    }
  }, [walletAddress]);

  return (
    <Box background={"black"} minH={"100vh"}>
      <Container maxW="container.md" centerContent>
        <Flex justifyContent={"center"} alignItems={"center"} minH={"100vh"}>
          <Stack spacing={8} textAlign="center">
            <Text
              bgGradient="linear(to-l, red.300, blue.700)"
              bgClip="text"
              fontSize="7xl"
              fontWeight="bold"
            >
              Web3Lance
            </Text>
            <Text fontSize="xl" color={"gray.100"}>
              Web3Lance is a secure Freelancing platform platform built on Polygon Network.
              It also includes inbuilt Escrow service for trustworthy transactions.
            </Text>
            <Button
              size={"lg"}
              bgGradient="linear(to-r, red.500, blue.500)"
              _hover={{
                bgGradient: "linear(to-r, red.700, blue.700)",
              }}
              isLoading={loading}
              loadingText="Connecting"
              spinnerPlacement="start"
              color={"white"}
              maxWidth={40}
              alignSelf={"center"}
              onClick={connectWallet}
            >
              Connect Wallet
            </Button>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}
