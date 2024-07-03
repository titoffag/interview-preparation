// Helper function to check if a string has consecutive duplicate characters
const hasConsecutiveDuplicates = (str) => {
  for (let i = 1; i < str.length; i++) {
    if (str[i] === str[i - 1]) {
      return true;
    }
  }
  return false;
};

const processFolder = async (folder) => {
  const result = [];
  const size = await new Promise((resolve) => folder.size(resolve));

  const readPromises = [];
  for (let i = 0; i < size; i++) {
    readPromises.push(new Promise((resolve) => folder.read(i, resolve)));
  }

  const files = await Promise.all(readPromises);

  for (const file of files) {
    if (typeof file === "string" && hasConsecutiveDuplicates(file)) {
      result.push(file);
    } else if (file instanceof Folder) {
      const subResult = await processFolder(file);
      result.push(...subResult);
    }
  }

  return result;
};

module.exports = async function (input) {
  const result = await processFolder(input);
  result.sort();
  return result;
};
