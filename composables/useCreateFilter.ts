export default (initialFilters: object = {}) => {
  let defaultFilter = ref({
    ...initialFilters,
    date__gte: "",
    date__lte: "",
    search: "",
    ignore: undefined
  });
  if(!initialFilters.hasOwnProperty('ordering'))
    defaultFilter.value.ordering = '-date';
  return defaultFilter;
};
