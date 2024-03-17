const getRedableText = (text: string) =>
  `${text[0].toUpperCase() + text.slice(1).toLocaleLowerCase()}`;


export const conjuctStrings = (text: string[]) => {
 const readableText = text?.map(getRedableText);
  if (readableText.length) {
    if (readableText.length <= 3) return readableText.slice(0).join(", ")
    return `${readableText.slice(0, readableText.length - 2).join(", ")} and ${readableText[readableText.length - 1]}`
  }
  return ''
 
}