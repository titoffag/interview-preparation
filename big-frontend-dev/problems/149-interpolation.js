function t(translation, data = {}) {
  return translation.replaceAll(/{{(.*?)}}/g, (_, key) => data[key] ?? '');
}
