export const kbToMb = (bytes) => bytes / 1024;

export const bToMb = (bytes) => bytes / (1024 * 1024);;

export const getFileExtention = (fileName = "") => "." + fileName?.split(".").pop().toLocaleLowerCase();