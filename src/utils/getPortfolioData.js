export default function getPortfolioData(data) {
  const filtersDefault = [{ label: "all", isChecked: true, title: "All" }];
  const cardsLayout = data.map((item) => {
    const id = item?.id;
    const thumbnail = item?.attributes?.full_image?.data?.attributes?.url;
    const fullImage = item?.attributes?.preview_image?.data?.attributes?.url;
    const filter = [];
    item?.attributes?.p_project_tags?.data.map((i) => {
      filter.push(i?.attributes?.title);
      if (filtersDefault.some((e) => e.label === i?.attributes?.title)) {
      } else {
        filtersDefault.push({
          label: i?.attributes?.title,
          title: i?.attributes?.title,
          isChecked: false,
        });
      }
      return i;
    });
    return {
      id: id.toString(),
      thumbnail,
      fullImage,
      filter,
    };
  });
  return { filtersDefault, cardsLayout };
}
