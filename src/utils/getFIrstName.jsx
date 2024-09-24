export default function getFirstName(fullName) {
    function capitalize(str) {
      if (typeof str !== 'string' || str.length === 0) {
        return str; 
      }
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0];
    return capitalize(firstName);
}