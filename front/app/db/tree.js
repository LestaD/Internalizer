import Baobab from 'baobab';

export default new Baobab({
  dir: {
    wd: '/home/www',
    '/': {
      'home': {
        type: 'dir',
        owner: 'root',
        inside: {
          'www': {
            type: 'dir',
            owner: 'root',
            inside: {
              'password-list.txt': {
                type: 'file',
                owner: 'webuser',
                size: 1212
              },
              'abc.net': {
                type: 'link',
                owner: 'webuser',
                url: 'http://abc.xyz'
              }
            }
          }
        }
      }
    }
  },
  commands: {},
  history: [],
  cmdHistory: [],
  executing: false,
  state: {
    users: {
      current: 'webuser',
      list: {
        'webuser': { password: null },
        'root': { password: 'thisisreallypassword' }
      }
    },
    hosts: {
      current: 'webhost'
    }
  }
});
