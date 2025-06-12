import { Card, CardBody, Flex, Image, Text } from "@chakra-ui/react";
import {
  eventCategories,
  eventStartDate,
  eventStartTime,
  eventEndTime,
} from "../utils/eventUtils";

export const EventCard = ({ event, categories }) => {
  return (
    <Card
      borderRadius="xl"
      cursor="pointer"
      p={2}
      _hover={{ transform: "scale(1.01)" }}
      bg="white"
    >
      <Image src={event.image} w="100%" h="50%" fit="cover" />
      <CardBody minW="100%" mt="-3">
        <Flex direction="column" gap="5">
          <Flex justify="space-between">
            <Flex direction="column">
              <Text casing="uppercase" color="blue" fontSize="15px">
                {eventCategories(event, categories)}
              </Text>
              <Text as="b" fontSize="20px" color="blackAlpha.900">
                {event.title}
              </Text>
              <Text color="gray.500" fontWeight="500">
                {event.description}
              </Text>
            </Flex>
          </Flex>
          <Flex direction="column" gap="1.5">
            <Text color="gray.700" fontSize="16px" fontWeight="medium">
              {event.location}
            </Text>
            <Text color="gray.500" fontWeight="500">
              {eventStartDate(event)}
            </Text>
            <Text color="gray.500" fontWeight="500">
              {eventStartTime(event)} - {eventEndTime(event)} hrs
            </Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default EventCard;
