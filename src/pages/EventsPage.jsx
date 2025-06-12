import { useState } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { SearchBar } from "../components/SearchBar";
import { SearchFilter } from "../components/SearchFilter";
import { SeeEvents } from "../components/SeeEvents";
import { useLoaderData } from "react-router-dom";
import { api_url } from "../main";

export const eventsLoader = async () => {
  const usersResponse = await fetch(api_url + "/users");
  const eventsResponse = await fetch(api_url + "/events");
  const categoriesResponse = await fetch(api_url + "/categories");
  const users = await usersResponse.json();
  const events = await eventsResponse.json();
  const categories = await categoriesResponse.json();

  return { users, events, categories };
};

export const EventsPage = () => {
  const { users, events, categories } = useLoaderData();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const writtenText = (value, text) => {
    return value.toString().toLowerCase().includes(text.toLowerCase());
  };

  let foundEvents = events;

  if (selectedCategory !== "") {
    foundEvents = foundEvents.filter((event) =>
      event.categoryIds.includes(Number(selectedCategory))
    );
  }

  foundEvents = foundEvents.filter(
    (event) =>
      // writtenText(
      //   users.find((user) => user.id === event.createdBy).name,
      //   query
      // ) ||
      writtenText(
        categories
          .filter((category) => event.categoryIds.includes(category.id))
          .map((category) => category.name),
        query
      ) || writtenText(Object.values(event), query)
  );

  return (
    <Flex direction="column" align="center" gap="3" bg="limeGreen">
      <Heading size="lg" color="blue">
        List of events
      </Heading>
      <SearchBar onChange={handleChange} />
      <SearchFilter
        onChange={setSelectedCategory}
        value={selectedCategory}
        categories={categories}
      />
      <SeeEvents foundEvents={foundEvents} categories={categories} />
    </Flex>
  );
};

export default EventsPage;
