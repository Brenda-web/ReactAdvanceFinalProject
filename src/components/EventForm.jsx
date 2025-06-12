import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";

import { Form, useParams, useLoaderData, Link } from "react-router-dom";
import { api_url } from "../main";

export const eventFormLoader = async () => {
  const usersResponse = await fetch(api_url + "/users");
  const eventsResponse = await fetch(api_url + "/events");
  const categoriesResponse = await fetch(api_url + "/categories");
  const users = await usersResponse.json();
  const events = await eventsResponse.json();
  const categories = await categoriesResponse.json();

  return { users, events, categories };
};

export const actionHandleSubmit = async ({ request, params }) => {
  let formData = await request.formData();
  let fetchOptions;

  if (params.eventId) {
    fetchOptions = {
      method: "PUT",
      url: api_url + "/events/" + params.eventId,
    };
  } else {
    fetchOptions = {
      method: "POST",
      url: api_url + "/events",
    };
  }

  const categoryIds = await formData
    .getAll("categoryIds")
    .map((str) => parseInt(str));

  const formDataObject = Object.fromEntries(formData);

  formDataObject["createdBy"] = Number(formDataObject["createdBy"]);

  formDataObject["categoryIds"] = categoryIds;

  formDataObject["startTime"] = formDataObject["date"]
    .concat("T")
    .concat(formDataObject["startTime"])
    .concat(":00.000Z");

  formDataObject["endTime"] = formDataObject["date"]
    .concat("T")
    .concat(formDataObject["endTime"])
    .concat(":00.000Z");

  delete formDataObject.date;

  const eventResponse = await fetch(fetchOptions.url, {
    method: fetchOptions.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataObject),
  });

  const event = await eventResponse.json();

  if (eventResponse.ok) {
    alert("The event was successfully saved!");
  } else {
    alert("Failed to process your request, please try again.");
  }
  window.location.href = `/event/${event.id}`;
  return null;
};

export const EventForm = () => {
  const { users, categories } = useLoaderData();
  const { eventId } = useParams();

  let event;

  if (eventId) {
    const { events } = useLoaderData();
    event = events.find((event) => event.id === Number(eventId));
  } else {
    event = {
      createdBy: "1",
      title: "",
      description: "",
      image: "",
      categoryIds: [],
      location: "",
      startTime: "",
      endTime: "",
    };
  }

  return (
    <Flex>
      <Box w={{ base: "5vw", md: "20vw", "2xl": "30vw" }}></Box>

      <Box w={{ base: "90vw", md: "60vw", "2xl": "40vw" }}>
        <Form method="post" action="">
          <Flex direction="column" align="flex-start" gap="7">
            <FormControl borderColor="gray.400" isRequired="true">
              <FormLabel>Event title</FormLabel>
              <Input
                name="title"
                defaultValue={event.title}
                placeholder="Event title"
              />
            </FormControl>

            <FormControl borderColor="gray.400" isRequired="true">
              <FormLabel>Event description</FormLabel>
              <Textarea
                name="description"
                defaultValue={event.description}
                placeholder="Describe the event"
              />
            </FormControl>

            <FormControl borderColor="gray.400">
              <FormLabel>Event categories</FormLabel>
              <CheckboxGroup
                colorScheme="green"
                defaultValue={event.categoryIds.map((id) => id.toString())}
              >
                <HStack>
                  {categories.map((category) => {
                    return (
                      <Checkbox
                        key={category.id}
                        name="categoryIds"
                        size="md"
                        value={category.id.toString()}
                      >
                        {category.name}
                      </Checkbox>
                    );
                  })}
                </HStack>
              </CheckboxGroup>
            </FormControl>

            <FormControl borderColor="gray.400">
              <FormLabel>Event image URL</FormLabel>
              <Input name="image" defaultValue={event.image} />
            </FormControl>

            <FormControl borderColor="gray.400" isRequired="true">
              <FormLabel>Event location</FormLabel>
              <Input name="location" defaultValue={event.location} />
            </FormControl>

            <FormControl borderColor="gray.400" isRequired="true">
              <FormLabel>Event date (mm-dd-yyyy)</FormLabel>
              <Input
                name="date"
                type="date"
                defaultValue={event.startTime.slice(0, 10)}
                required
              />
              <FormLabel>Event starting time</FormLabel>
              <Input
                name="startTime"
                type="time"
                required
                defaultValue={event.startTime.slice(11, 16)}
              />
              <FormLabel>Event ending time</FormLabel>
              <Input
                name="endTime"
                type="time"
                required
                defaultValue={event.endTime.slice(11, 16)}
              />
            </FormControl>

            <FormControl borderColor="gray.400" isRequired="true">
              <FormLabel>Event added by:</FormLabel>
              <Select
                name="createdBy"
                borderColor="gray.400"
                defaultValue={event.createdBy}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Flex w="100%" justify="flex-end" gap="2">
              <Button colorScheme="teal" variant="solid" type="submit">
                Save event
              </Button>
              <Link to="/">
                <Button colorScheme="red" variant="solid">
                  Cancel
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Form>
      </Box>

      <Box w={{ base: "5vw", md: "20vw", "2xl": "30vw" }}></Box>
    </Flex>
  );
};
export default EventForm;
