export const QuitarSignos = (values) => {
  let _values = values
  if (typeof values === "string")
    _values = values
      .replaceAll("$", "")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll(" ", "")
      .replaceAll(",", "");


  return parseFloat(_values);
}