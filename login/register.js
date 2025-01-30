import fs from 'fs/promises';
import bcrypt from 'bcryptjs';

const USERS_FILE = './users.json';

export async function register(question) {
  console.clear();
  console.log('=== User Registration ===');

  const name = await question('Enter your name: ');
  const email = await question('Enter your email: ');
  const password = await question('Enter your password: ');

  const users = await loadUsers();

  if (users.some((user) => user.email === email)) {
    console.log('\nEmail already exists. Try another one.');
    return false;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashedPassword });

  await saveUsers(users);
  console.log('\nRegistration successful!');
  return true;
}

async function loadUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    await fs.writeFile(USERS_FILE, '[]');
    return [];
  }
}

async function saveUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}
