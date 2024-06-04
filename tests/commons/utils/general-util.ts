export function generateRandomEmail(): string {
    const userName = 'pw-thecortest' + Math.floor(Math.random() * 1000); // Generate random number from 0 to 1000 and add to "thecortest"
    const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Generate a random letter from a to z
    const domain = 'gmail.com';
    return `${userName}${randomLetter}@${domain}`;
}
