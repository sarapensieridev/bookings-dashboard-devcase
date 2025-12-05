const fs = require('fs');

// Generate 150 bookings around current date
const bookings = [];
const guests = [];

const today = new Date('2025-12-05');

for (let i = 1; i <= 150; i++) {
  const guestId = `g${Math.ceil(i / 3)}`; 
  
  // Generate dates spread from -30 to +30 days from today
  const dayOffset = (i % 60) - 30; // Range: -30 to +29
  const checkInDate = new Date(today);
  checkInDate.setDate(today.getDate() + dayOffset);
  
  const checkOutDate = new Date(checkInDate);
  checkOutDate.setDate(checkInDate.getDate() + 5); // 5 day stays
  
  bookings.push({
    bookingId: `ID-${i}`,
    guestId: guestId,
    checkIn: checkInDate.toISOString().split('T')[0],
    checkOut: checkOutDate.toISOString().split('T')[0],
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

console.log('Generated 150 bookings and 50 guests with dates around 2025-12-05');