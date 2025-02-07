export default class GlobalVariables {
  static username: string;
  static authenticate: boolean;
  static createVariables() {
    //set here variables you want to be global
    this.username = "unknown";
    this.authenticate = false;
  }

  static getXP() {
    //method to get XP
    return this.username;
  }

  static setXP(value: string) {
    //method to add XP
    this.username = value;
  }

  static getAuthen() {
    return this.authenticate;
  }

  static setAuthen(value: boolean) {
    this.authenticate = value;
  }

  //create others methods you want for your variables
}
