import fs from 'fs/promises';
import bcrypt from 'bcryptjs';

const USERS_FILE = './users.json';

export async function register(question) {
  console.clear();
  console.log(' User Registration ');

  const name = await question('Please enter your name: ');
  const email = await question('Please enter your email: ');
  const password = await question('Please enter your password: ');

  const users = await fetchUsers();

  if (users.some((user) => user.email === email)) {
    console.log('\nThis email is already registered. Please use a different one.');
    return false;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashedPassword });

  await storeUsers(users);
  console.log('\nRegistration completed successfully.');
  return true;
}

async function fetchUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    await fs.writeFile(USERS_FILE, '[]');
    return [];
  }
}

async function storeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}
