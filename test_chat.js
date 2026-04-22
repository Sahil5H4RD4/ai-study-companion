import fetch from 'node-fetch';

async function test() {
  const history = [
    {
      role: 'assistant',
      content: "👋 Hey there! I'm your AI Study Tutor..."
    }
  ];
  try {
    const res = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'What is Newton\'s first law?', history }),
    });
    const text = await res.text();
    console.log("STATUS:", res.status);
    console.log("RESPONSE:", text);
  } catch (e) {
    console.error(e);
  }
}
test();
