import { Center, Text, VStack } from "@chakra-ui/react";

export const NotFound = () => {
  return (
    <Center>
      <VStack>
        <Text fontSize="64" as="b">
          404
        </Text>
        <Text>The requested URL not found.</Text>
      </VStack>
    </Center>
  );
};

export default NotFound;
