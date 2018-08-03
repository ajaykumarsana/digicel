// Works for 'US' only. TODO: Make this more robust for int'l
export function extractAreaCode(phoneNumber: string): string {
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  if (digitsOnly[0] === '1') {
    return digitsOnly.substr(1, 3);
  } else {
    return digitsOnly.substr(0, 3);
  }
}
