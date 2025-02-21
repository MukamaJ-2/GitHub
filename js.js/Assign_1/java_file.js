import readline from 'readline';
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const USERS_FILE = join(__dirname, 'users.json');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promisify readline question
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

class AuthSystem {
  constructor() {
    this.currentUser = null;
  }

  async loadUsers() {
    try {
      const data = await fs.readFile(USERS_FILE, 'utf8');
      return JSON.parse(data);
    } catch {
      await fs.writeFile(USERS_FILE, '[]');
      return [];
    }
  }

  async saveUsers(users) {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  }

  async register() {
    console.clear();
    console.log(' User Registration \n');

    const name = await question('Enter your name: ');
    const email = await question('Enter your email: ');
    const password = await question('Enter your password: ');

    const users = await this.loadUsers();
    
    // Check if email already exists
    if (users.some(user => user.email === email)) {
      console.log('\nEmail already exists, Use another one.');
      return false;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    users.push({
      name,
      email,
      password: hashedPassword
    });

    await this.saveUsers(users);
    console.log('\nRegistration successful!');
    return true;
  }

  async login() {
    console.clear();
    console.log(' User Login \n');

    const email = await question('Enter your email: ');
    const password = await question('Enter your password: ');

    const users = await this.loadUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      console.log('\nUser not found.');
      return false;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      console.log('\nWrong password.');
      return false;
    }

    this.currentUser = user;
    console.log('\nLogin successful!');
    return true;
  }

  async showMenu() {
    while (true) {
      console.clear();
      console.log(` Welcome ${this.currentUser.name} \n`);
      console.log('1. View Profile');
      console.log('2. Logout');
      console.log('3. Exit\n');

      const choice = await question('Select an option: ');

      switch (choice) {
        case '1':
          await this.viewProfile();
          break;
        case '2':
          this.currentUser = null;
          console.log('\nLogged out successfully.');
          return;
        case '3':
          console.log('\nGoodbye.');
          rl.close();
          process.exit(0);
        default:
          console.log('\nInvalid option.');
      }

      await question('\nPress Enter to continue...');
    }
  }

  async viewProfile() {
    console.clear();
    console.log(' User Profile \n');
    console.log(`Name: ${this.currentUser.name}`);
    console.log(`Email: ${this.currentUser.email}`);
  }

  async start() {
    while (true) {
      console.clear();
      console.log(' Authentication System \n');
      console.log('1. Register');
      console.log('2. Login');
      console.log('3. Exit\n');

      const choice = await question('Select an option: ');

      switch (choice) {
        case '1':
          await this.register();
          break;
        case '2':
          if (await this.login()) {
            await this.showMenu();
          }
          break;
        case '3':
          console.log('\nHave a good day my friend.');
          rl.close();
          process.exit(0);
        default:
          console.log('\nInvalid option.');
      }

      await question('\nPress Enter to continue...');
    }
  }
}

// Start the application
const authSystem = new AuthSystem();
authSystem.start().catch(console.error);