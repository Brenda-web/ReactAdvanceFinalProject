import { Input } from "@chakra-ui/react";

export const SearchBar = ({ onChange }) => {
  return (
    <Input
      w={{ base: "50", sm: "80" }}
      size="md"
      bg="gray.200"
      placeholder="Search for events"
      _placeholder={{ color: "red" }}
      onChange={onChange}
    />
  );
};

export default SearchBar;
