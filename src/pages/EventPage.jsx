import React from "react";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import {
  eventCategories,
  eventCreator,
  eventEndTime,
  eventStartDate,
  eventStartTime,
} from "../utils/eventUtils";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { NotFound } from "./NotFound";
import { EventForm } from "../components/EventForm";
import { api_url } from "../main";

export const eventLoader = async () => {
  const usersResponse = await fetch(api_url + "/users");
  const eventsResponse = await fetch(api_url + "/events");
  const categoriesResponse = await fetch(api_url + "/categories");
  const users = await usersResponse.json();
  const events = await eventsResponse.json();
  const categories = await categoriesResponse.json();

  return { users, events, categories };
};

export const EventPage = () => {
  const { eventId } = useParams();
  const { users, events, categories } = useLoaderData();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteEvent = async (eventId) => {
    if (confirm("Are you sure you want to delete this event?")) {
      const eventResponse = await fetch(api_url + "/events/" + eventId, {
        method: "DELETE",
      });
      if (eventResponse.ok) {
        alert("The event successfully deleted!");
        navigate(`/`);
      } else {
        alert("An error occured!");
      }
    }
  };

  const event = events.find((event) => event.id === Number(eventId));
  if (!event) {
    return <NotFound />;
  }

  return (
    <Flex>
      <Box minW="15vw"></Box>

      <Center minH="80vh">
        <Box w="70vw" bg="gray.200">
          <Image src={event.image} w="100%" h="30vh" fit="cover" />
          <Box>
            <Flex direction="column" gap="8" p="2">
              <Flex justify="space-between" gap="4">
                <Flex direction="column" gap="4">
                  <Text
                    casing="uppercase"
                    color="blue"
                    fontWeight="500"
                    fontSize="15px"
                  >
                    {eventCategories(event, categories)}
                  </Text>
                  <Text as="b" fontSize="20px" color="blackAlpha.900">
                    {event.title}
                  </Text>
                  <Text color="gray.500" fontWeight="500">
                    {event.description}
                  </Text>
                </Flex>

                <HStack>
                  <Text align="center" fontSize="15px">
                    created by
                  </Text>
                  <Image
                    borderRadius="full"
                    boxSize="70px"
                    src={eventCreator(event, users).image}
                    alt={eventCreator(event, users).name}
                  />
                  <Text align="center" fontSize="15px">
                    {eventCreator(event, users).name}
                  </Text>
                </HStack>
              </Flex>

              <Text
                whiteSpace="wrap"
                color="blackAlpha.900"
                fontSize="18px"
                fontWeight="500"
              >
                {event.location}
              </Text>
              <Flex wrap="wrap" gap="2">
                <Text whiteSpace="nowrap" color="gray.500" fontWeight="500">
                  {eventStartDate(event)}
                </Text>
                <Text whiteSpace="nowrap" color="gray.500" fontWeight="500">
                  {eventStartTime(event)} - {eventEndTime(event)} hrs
                </Text>
              </Flex>
              <Flex gap="1" wrap="wrap" justify="flex-end">
                <Button colorScheme="blue" onClick={onOpen} w="36">
                  🖉 Edit event
                </Button>
                <Modal
                  isOpen={isOpen}
                  onClose={onClose}
                  size={{ base: "full", lg: "3xl", xl: "5xl" }}
                  closeOnEsc="true"
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>
                      <ModalCloseButton />
                    </ModalHeader>

                    <ModalBody>
                      <EventForm />
                    </ModalBody>
                  </ModalContent>
                </Modal>
                <Button
                  colorScheme="red"
                  w="36"
                  onClick={() => deleteEvent(eventId)}
                >
                  ✖ Delete event
                </Button>
                <Link to="/">
                  <Button colorScheme="teal" variant="solid" w="36">
                    ← Back
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Center>

      <Box minW="15vw"></Box>
    </Flex>
  );
};

export default EventPage;
