
import Command from 'models/Command';
import { loginAs, getCurrentUser } from 'actions/StateActions';

export default function() {

  // command UNAME
  Command.Make('uname', function() {
    this.description = ['Print operating system name', 'Usage: uname [-a]'];
    this.onRun(function (args){
      let full = 'Linux';

      args.map((arg) => {
        if (arg.replace('-', '') == 'a') {
          full += ' CurrentDedicated.00x16.net 9.1.0 webuser:iiu~8/12 RELEASE_X64/X64'
        }
      });

      this.print(full);
      this.done();
    })
  });


  // command WELCOME
  Command.Make('welcome', function() {
    this.description = ['Print welcome text', 'Usage: welcome'];
    this.onRun(function(args) {
      this.print('React.Terminal v' + String(VERSION));
      this.print('Type `help` to show list of available commands');
      this.done();
    });
  });


  // command WHOAMI
  Command.Make('whoami', function() {
    this.description = ['Display current user name'];
    this.onRun(function(args) {
      this.print(getCurrentUser());
      this.done();
    });
  });


  // command CHU
  Command.Make('chu', function() {
    this.description = ['Change user by credentials', 'Usage: chu <user> [<password>]'];
    this.onRun(function(args) {
      const [login, password] = args;
      if (!login) {
        this.print('Usage: chu <user> [<password>]');
        this.done();
      }
      else {
        if (loginAs(login, password)) {
          this.done();
        }
        else {
          this.print('Error: Invalid password or user not found!');
          this.done();
        }
      }
    });
  });


  // command ECHO
  Command.Make('echo', function() {
    this.description = ['Write arguments to the terminal output', 'Usage: echo [arg1] [arg2] [...] [argN]'];
    this.onRun(function(args) {
      this.print(args.join(' '));
      this.done();
    });
  });


};