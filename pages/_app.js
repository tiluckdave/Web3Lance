import ConnectProvider from "../components/ConnectProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const config = {
  fonts: {
    heading: "var(--font-nunito)",
    body: "var(--font-nunito)",
  },
  initialColorMode: "dark",
};

export const theme = extendTheme({ config });

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-nunito: "Nunito Sans", sans-serif;
          }
        `}
      </style>
      <ChakraProvider theme={theme}>
        <ConnectProvider>
          <Component {...pageProps} />
        </ConnectProvider>
      </ChakraProvider>
    </>
  );
}
