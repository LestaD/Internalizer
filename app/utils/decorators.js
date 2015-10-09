import ReactMixin from 'react-mixin';
import { branch as BaobabBranch } from 'baobab-react/higher-order';

global.Deprecated = function(why) {
  if (typeof why !== 'string') {
    why = '';
  }
  return function(target, key, descriptor) {
    let className = target.constructor.name;
    let old = descriptor.value;

    descriptor.value = function(...args) {
      let that = this;
      console.warn(`DEPRECATE: Method ${className}.${key}() is deprecated. ${why}`);
      return old.call(that, ...args);
    }
    return descriptor;
  }
};


global.Say = function(what) {
  if (typeof what !== 'string') {
    what = 'Pings!';
  }
  return function(target, key, descriptor) {
    let className = target.constructor.name;
    let old = descriptor.value;

    descriptor.value = function(...args) {
      let that = this;
      console.info(`%c${className}.${key} said: %c ${what}`, 'color: gray', 'color: black');
      return old.call(that, ...args);
    }
    return descriptor;
  }
};


global.Warning = function(what) {
  if (typeof what !== 'string') {
    what = '';
  }
  return function(target, key, descriptor) {
    let className = target.constructor.name;
    let old = descriptor.value;

    descriptor.value = function(...args) {
      let that = this;
      console.warn(`Warning in ${className}.${key}(): ${what}`);
      return old.call(that, ...args);
    }
    return descriptor;
  }
};


global.Timer = function() {
  return function(target, key, descriptor) {
    let className = target.constructor.name;
    let old = descriptor.value;

    descriptor.value = function(...args) {
      let that = this;
      let timer = null;
      let result = null;
      console.info(`%cRun ${className}.${key}(${args.join(',')})`, 'color: blue');

      timer = 'End ' + className + '.' + key + '(' + args.join(',') + ')';
      console.time(timer);

      result = old.call(that, ...args);
      console.timeEnd(timer);
      return result;
    }
    return descriptor;
  }
};


/**
 * Subscribe component to list of BaobabBranches
 * Ex.:
 *   @SubscribedTo('account', 'company.current')
 *   class SetComponent extends Component {}
 *
 * In component's props was created: this.props.account and this.props.company_current
 */
global.SubscribedTo = function(...branches) {
  let cursors = {};
  let cursorNames = []; // use it to show in ReactConsole

  for (let branch of branches) {
    cursors[branch.replace(/\./g, '_')] = branch.split('.');
    cursorNames.push(`.${branch}`);
  }

  return function(Component) {
    let branched = BaobabBranch(Component, { cursors: cursors });
    branched.displayName = `${Component.name}👂🌲${cursorNames.join(' & ')}`;
    return branched;
  }
}


global.AppliedMixins = function(...mixins) {
  return function (Component) {
    for (let Mixin of mixins) {
      Component = ReactMixin.onClass(Component, Mixin);
    }
    return Component;
  }
}
