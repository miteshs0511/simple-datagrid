/**
 * Generates a unique ID based on the given name and index.
 *
 * @param {string} name - The name of the item, used as part of the unique ID.
 * @param {number} index - The index of the item in the list to ensure uniqueness.
 * @returns {string} A unique ID in the format: "name-index".
 *
 * @example
 * generateUniqueId("smss.exe", 0); // Output: "smss.exe-0"
 */ 
export function generateUniqueId(name: string, index: number) {
    return `${name}-${index}`; 
};