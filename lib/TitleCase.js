export const TitleCase = (str) => {
    const firstLetter = str.substring(0,1);
    const restLetter = str.substring(1, str.length);
    const firstLetterCap = firstLetter.toUpperCase();
    const joinToOne = firstLetterCap + restLetter;
    return joinToOne
}
