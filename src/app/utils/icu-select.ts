// https://unicode-org.github.io/icu/userguide/format_parse/messages/
// https://angular.io/guide/i18n-common-prepare#mark-alternates-and-nested-expressions
export const icuSelect = <T extends string | number>(
  value: T,
  options: Record<T, string>
): string => {
  return options[value];
};
