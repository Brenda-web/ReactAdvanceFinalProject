import { Radio, RadioGroup, SimpleGrid } from "@chakra-ui/react";

export const SearchFilter = ({ onChange, activeCategory, categories }) => {
  return (
    <RadioGroup colorScheme="teal" onChange={onChange} value={activeCategory}>
      <SimpleGrid columns={{ base: "2", sm: "4" }} columnGap="3">
        <Radio key="" value="">
          All categories
        </Radio>
        {categories.map(({ name, id }) => {
          return (
            <Radio key={id} value={id.toString()}>
              {name}
            </Radio>
          );
        })}
      </SimpleGrid>
    </RadioGroup>
  );
};

export default SearchFilter;
