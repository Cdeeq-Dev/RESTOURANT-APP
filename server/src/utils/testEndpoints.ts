const BASE_URL = 'http://localhost:5000';

async function runTests() {
  console.log('🧪 Starting API Endpoint Verification Tests...\n');

  const tests = [
    { name: '1. GET /api/health', url: `${BASE_URL}/api/health` },
    { name: '2. GET /api/categories', url: `${BASE_URL}/api/categories` },
    { name: '3. GET /api/menu', url: `${BASE_URL}/api/menu` },
    { name: '4. GET /api/menu/featured', url: `${BASE_URL}/api/menu/featured` },
    { name: '5. GET /api/menu?category=breakfast', url: `${BASE_URL}/api/menu?category=breakfast` },
    { name: '6. GET /api/menu?featured=true', url: `${BASE_URL}/api/menu?featured=true` },
    { name: '7. GET /api/menu/jollof-rice-grilled-chicken', url: `${BASE_URL}/api/menu/jollof-rice-grilled-chicken` },
    { name: '8. GET /api/menu/food-that-does-not-exist (404 Test)', url: `${BASE_URL}/api/menu/food-that-does-not-exist` },
  ];

  for (const test of tests) {
    try {
      const res = await fetch(test.url);
      const data = await res.json();
      console.log(`========================================`);
      console.log(`TEST: ${test.name}`);
      console.log(`STATUS: ${res.status}`);
      console.log(`RESPONSE:`, JSON.stringify(data, null, 2).slice(0, 500) + (JSON.stringify(data).length > 500 ? '...' : ''));
      console.log(`========================================\n`);
    } catch (err) {
      console.error(`FAILED: ${test.name}`, err);
    }
  }
}

runTests();
