const fs = require('fs');

// Generate 150 bookings
const bookings = [];
const guests = [];

for (let i = 1; i <= 150; i++) {
  const guestId = `g${Math.ceil(i / 3)}`; 
  
  bookings.push({
    bookingId: `ID-${i}`,
    guestId: guestId,
    checkIn: `2025-${String(Math.floor(i / 30) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    checkOut: `2025-${String(Math.floor(i / 30) + 1).padStart(2, '0')}-${String(((i % 28) + 1 + 5)).padStart(2, '0')}`,
    guestsNumber: Math.floor(Math.random() * 4) + 1
  });
}

// Generate 50 guests
for (let i = 1; i <= 50; i++) {
  guests.push({
    guestId: `g${i}`,
    name: `Guest ${i}`,
  });
}

fs.writeFileSync('./data/bookings.json', JSON.stringify(bookings, null, 2));
fs.writeFileSync('./data/guests.json', JSON.stringify(guests, null, 2));

console.log('Generated 150 bookings and 50 guests');