import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const API_BASE = 'http://localhost:5000/api';

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  errors?: any;
}

async function runTests() {
  console.log('🧪 Starting Step 06C Reservation Verification Tests (A-M)...\n');

  let createdReservationNumber = '';
  const futureDate = new Date(Date.now() + 86400000 * 3).toISOString(); // 3 days in future
  const pastDate = new Date(Date.now() - 86400000).toISOString(); // 1 day in past

  // -------------------------------------------------------------
  // Test A: Valid reservation -> Expected 201
  // -------------------------------------------------------------
  console.log('--- Test A: Valid reservation ---');
  const resA = await fetch(`${API_BASE}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Abubakar',
      phone: '08012345678',
      email: 'guest@example.com',
      reservationDate: futureDate,
      guestCount: 4,
      specialRequests: 'Window table if available',
    }),
  });
  const dataA = (await resA.json()) as ApiResponse;
  console.log(`Status: ${resA.status}`);
  console.log('Response:', JSON.stringify(dataA, null, 2));
  if (resA.status === 201 && dataA.success && dataA.data?.reservationNumber) {
    createdReservationNumber = dataA.data.reservationNumber;
    console.log('✅ Test A PASSED\n');
  } else {
    console.error('❌ Test A FAILED\n');
  }

  // -------------------------------------------------------------
  // Test B: Valid reservation without email -> Expected 201
  // -------------------------------------------------------------
  console.log('--- Test B: Valid reservation without email ---');
  const resB = await fetch(`${API_BASE}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Fatima',
      phone: '08098765432',
      reservationDate: futureDate,
      guestCount: 2,
    }),
  });
  const dataB = (await resB.json()) as ApiResponse;
  console.log(`Status: ${resB.status}`);
  console.log('Response:', JSON.stringify(dataB, null, 2));
  if (resB.status === 201 && dataB.success) {
    console.log('✅ Test B PASSED\n');
  } else {
    console.error('❌ Test B FAILED\n');
  }

  // -------------------------------------------------------------
  // Test C: Missing customerName -> Expected 400
  // -------------------------------------------------------------
  console.log('--- Test C: Missing customerName ---');
  const resC = await fetch(`${API_BASE}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone: '08012345678',
      reservationDate: futureDate,
      guestCount: 4,
    }),
  });
  const dataC = (await resC.json()) as ApiResponse;
  console.log(`Status: ${resC.status}`);
  console.log('Response:', JSON.stringify(dataC, null, 2));
  if (resC.status === 400 && !dataC.success) {
    console.log('✅ Test C PASSED\n');
  } else {
    console.error('❌ Test C FAILED\n');
  }

  // -------------------------------------------------------------
  // Test D: Invalid email -> Expected 400
  // -------------------------------------------------------------
  console.log('--- Test D: Invalid email ---');
  const resD = await fetch(`${API_BASE}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Chidi',
      phone: '08012345678',
      email: 'not-an-email',
      reservationDate: futureDate,
      guestCount: 2,
    }),
  });
  const dataD = (await resD.json()) as ApiResponse;
  console.log(`Status: ${resD.status}`);
  console.log('Response:', JSON.stringify(dataD, null, 2));
  if (resD.status === 400 && !dataD.success) {
    console.log('✅ Test D PASSED\n');
  } else {
    console.error('❌ Test D FAILED\n');
  }

  // -------------------------------------------------------------
  // Test E: Past reservation date -> Expected 400
  // -------------------------------------------------------------
  console.log('--- Test E: Past reservation date ---');
  const resE = await fetch(`${API_BASE}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Tunde',
      phone: '08012345678',
      reservationDate: pastDate,
      guestCount: 2,
    }),
  });
  const dataE = (await resE.json()) as ApiResponse;
  console.log(`Status: ${resE.status}`);
  console.log('Response:', JSON.stringify(dataE, null, 2));
  if (resE.status === 400 && !dataE.success) {
    console.log('✅ Test E PASSED\n');
  } else {
    console.error('❌ Test E FAILED\n');
  }

  // -------------------------------------------------------------
  // Test F: guestCount = 0 -> Expected 400
  // -------------------------------------------------------------
  console.log('--- Test F: guestCount = 0 ---');
  const resF = await fetch(`${API_BASE}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Amina',
      phone: '08012345678',
      reservationDate: futureDate,
      guestCount: 0,
    }),
  });
  const dataF = (await resF.json()) as ApiResponse;
  console.log(`Status: ${resF.status}`);
  console.log('Response:', JSON.stringify(dataF, null, 2));
  if (resF.status === 400 && !dataF.success) {
    console.log('✅ Test F PASSED\n');
  } else {
    console.error('❌ Test F FAILED\n');
  }

  // -------------------------------------------------------------
  // Test G: guestCount > 20 -> Expected 400
  // -------------------------------------------------------------
  console.log('--- Test G: guestCount > 20 ---');
  const resG = await fetch(`${API_BASE}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Emeka',
      phone: '08012345678',
      reservationDate: futureDate,
      guestCount: 25,
    }),
  });
  const dataG = (await resG.json()) as ApiResponse;
  console.log(`Status: ${resG.status}`);
  console.log('Response:', JSON.stringify(dataG, null, 2));
  if (resG.status === 400 && !dataG.success) {
    console.log('✅ Test G PASSED\n');
  } else {
    console.error('❌ Test G FAILED\n');
  }

  // -------------------------------------------------------------
  // Test H: Missing phone -> Expected 400
  // -------------------------------------------------------------
  console.log('--- Test H: Missing phone ---');
  const resH = await fetch(`${API_BASE}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Sadiya',
      reservationDate: futureDate,
      guestCount: 2,
    }),
  });
  const dataH = (await resH.json()) as ApiResponse;
  console.log(`Status: ${resH.status}`);
  console.log('Response:', JSON.stringify(dataH, null, 2));
  if (resH.status === 400 && !dataH.success) {
    console.log('✅ Test H PASSED\n');
  } else {
    console.error('❌ Test H FAILED\n');
  }

  // -------------------------------------------------------------
  // Test I: GET existing reservation by reservationNumber -> Expected 200
  // -------------------------------------------------------------
  console.log(`--- Test I: GET existing reservation by reservationNumber (${createdReservationNumber}) ---`);
  const resI = await fetch(`${API_BASE}/reservations/${createdReservationNumber}`);
  const dataI = (await resI.json()) as ApiResponse;
  console.log(`Status: ${resI.status}`);
  console.log('Response:', JSON.stringify(dataI, null, 2));
  if (resI.status === 200 && dataI.success && dataI.data?.reservationNumber === createdReservationNumber) {
    console.log('✅ Test I PASSED\n');
  } else {
    console.error('❌ Test I FAILED\n');
  }

  // -------------------------------------------------------------
  // Test J: GET nonexistent reservation -> Expected 404
  // -------------------------------------------------------------
  console.log('--- Test J: GET nonexistent reservation ---');
  const resJ = await fetch(`${API_BASE}/reservations/RES-NONEXISTENT-999999`);
  const dataJ = (await resJ.json()) as ApiResponse;
  console.log(`Status: ${resJ.status}`);
  console.log('Response:', JSON.stringify(dataJ, null, 2));
  if (resJ.status === 404 && !dataJ.success) {
    console.log('✅ Test J PASSED\n');
  } else {
    console.error('❌ Test J FAILED\n');
  }

  // -------------------------------------------------------------
  // Test K & L: Confirm status is PENDING & reservationNumber format
  // -------------------------------------------------------------
  console.log('--- Test K & L: Confirm status is PENDING and reservationNumber is non-sequential ---');
  const resFromDb = await prisma.reservation.findUnique({
    where: { reservationNumber: createdReservationNumber },
  });

  if (resFromDb) {
    const kPassed = resFromDb.status === 'PENDING';
    const lPassed = createdReservationNumber.startsWith('RES-') && !/^RES-\d+$/.test(createdReservationNumber);

    console.log(`Reservation DB Status: "${resFromDb.status}"`);
    console.log(`Reservation Number: "${resFromDb.reservationNumber}"`);

    if (kPassed) console.log('✅ Test K PASSED (Reservation default status is PENDING)');
    else console.error('❌ Test K FAILED');

    if (lPassed) console.log('✅ Test L PASSED (reservationNumber is unpredictable & non-sequential)\n');
    else console.error('❌ Test L FAILED\n');
  } else {
    console.error('❌ Test K & L FAILED (Reservation not found in DB)\n');
  }

  await prisma.$disconnect();
}

runTests().catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
