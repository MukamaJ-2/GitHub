export async function displayProfile(question, user) {
    console.clear();
    console.log(' User Profile ');
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
  
    await question('\nPress Enter to return to the menu...');
  }
  