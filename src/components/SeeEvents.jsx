import { Link } from "react-router-dom";
import { EventCard } from "./EventCard";
import { AspectRatio, Flex } from "@chakra-ui/react";

export const SeeEvents = ({ foundEvents, categories }) => {
  return (
    <Flex justify="center" wrap="wrap" gap="8">
      {foundEvents.map((event) => {
        return (
          <Link key={event.id} to={`/event/${event.id}`}>
            <AspectRatio
              w={{ base: "90vw", md: "40vw", lg: "30vw", xl: "22vw" }}
              ratio={3 / 4}
            >
              <EventCard event={event} categories={categories} />
            </AspectRatio>
          </Link>
        );
      })}
    </Flex>
  );
};

export default SeeEvents;
