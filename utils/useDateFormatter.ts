export const useDateFormatter = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const formatter = new Intl.DateTimeFormat("in-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return formatter.format(date);
  };
  return { formatDate };
};
