const fs = require('fs').promises;
const path = require('path');

const USERS_FILE = path.join(__dirname, '../data/users.json');

class FileHandler {
  static async readUsers() {
    try {
      const data = await fs.readFile(USERS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return { users: [] };
    }
  }

  static async writeUsers(data) {
    try {
      await fs.writeFile(USERS_FILE, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error('Error writing users:', error);
      return false;
    }
  }

  static async addUser(user) {
    const data = await this.readUsers();
    data.users.push(user);
    return await this.writeUsers(data);
  }

  static async findUserByEmail(email) {
    const data = await this.readUsers();
    return data.users.find(user => user.email === email);
  }

  static async findUserById(id) {
    const data = await this.readUsers();
    return data.users.find(user => user.id === id);
  }
}

module.exports = FileHandler;
