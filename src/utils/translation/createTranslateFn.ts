const format = (
  str: string,
  params?: Record<string, string | number>
): string => {
  if (!params) return str;

  let result = str;
  str.match(/\{\{[^{}]+\}\}/g)?.forEach((match) => {
    const key = match.slice(2, match.length - 2);
    const value = "" + params[key];

    if (value) {
      result = result.replaceAll(match, value);
    }
  });

  return result;
};

const translate = (
  translations: Record<string, string>,
  key: string,
  params?: Record<string, string | number>,
  options?: { ignoreError?: boolean }
) => {
  const translation = translations[key];

  if (!translation && !options?.ignoreError) {
    console.error(`Translation with key "${key}" is not found`);
    return;
  }

  return format(translation, params);
};

export const createTranslateFn = (
  translations: Record<string, string>,
  options?: { ignoreError?: boolean }
) => {
  return (key: string, params?: Record<string, string>) => {
    return translate(translations, key, params, options);
  };
};
