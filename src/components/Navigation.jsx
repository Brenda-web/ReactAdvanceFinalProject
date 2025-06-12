import { Flex, Button } from "@chakra-ui/react";

import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav>
      <Flex gap="2" align="space-between" marginLeft="4" mb="4">
        <Button size="lg" colorScheme="black" variant="link" width="34">
          <Link to="/">Event list</Link>
        </Button>

        <Link to="/event/new">
          <Button colorScheme="red" variant="outline" w="34">
            {" "}
            Add Event
          </Button>
        </Link>
      </Flex>
    </nav>
  );
};

export default Navigation;
