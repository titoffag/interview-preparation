function isReferenceType(variable) {
  return variable && typeof variable === "object";
}

function deepClone(object) {
  let recipient = object;
  if (isReferenceType(object)) {
    recipient = object instanceof Array ? [] : {};

    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        recipient[key] = deepClone(object[key]);
      }
    }
  }

  return recipient;
}
