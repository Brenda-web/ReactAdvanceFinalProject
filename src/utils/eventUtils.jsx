export const eventCategories = (event, categories) => {
  return categories
    .filter((category) => event.categoryIds.includes(category.id))
    .map((category) => category.name)
    .join(", ");
};

export const eventStartDate = (event) => {
  return new Date(event.startTime).toDateString();
};

export const eventStartTime = (event) => {
  return event.startTime.slice(11, 16);
};

export const eventEndTime = (event) => {
  return event.endTime.slice(11, 16);
};

export const eventCreator = (event, users) => {
  return users.find((user) => user.id === event.createdBy);
};
