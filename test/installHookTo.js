/*
Adapted from https://gist.github.com/iamkvein/2006752

//// Example ////

var stdout = process.stdout;

installHookTo(stdout);

console.log('-- Sync');

stdout.hook('write', function(string, encoding, fd, write) {
  write('caught: ' + string);
});

console.log('foo');

stdout.unhook('write');

console.log('-- Async');

stdout.hook('write', function(string, encoding, fd, write) {
  write('caught async: ' + string);
}, true);

console.log('bar');

stdout.unhook('write');

console.log('baz');
*/

module.exports = function (obj) {
  if (obj.hook || obj.unhook) {
    throw new Error('Object already has properties hook and/or unhook');
  }

  obj.hook = function (methName, _fn, isAsync) {
    const self = this;

    // Make sure method exists
    if (!(Object.prototype.toString.call(self[methName]) === '[object Function]')) {
      throw new Error('Invalid method: ' + methName);
    }

    // We should not hook a hook
    if (self.unhook.methods[methName]) {
      throw new Error('Method already hooked: ' + methName);
    }

    // Reference default method
    const methRef = self.unhook.methods[methName] = self[methName];

    self[methName] = function () {
      const args = Array.prototype.slice.call(arguments);

      // Our hook should take the same number of arguments
      // as the original method so we must fill with undefined
      // optional args not provided in the call
      while (args.length < methRef.length) {
        args.push(undefined);
      }

      // Last argument is always original method call
      args.push(function () {
        const args = arguments;

        if (isAsync) {
          process.nextTick(function () {
            methRef.apply(self, args);
          });
        } else {
          methRef.apply(self, args);
        }
      });

      _fn.apply(self, args);
    };
  };

  obj.unhook = function (methName) {
    const self = this;
    const ref = self.unhook.methods[methName];

    if (ref) {
      self[methName] = self.unhook.methods[methName];
      delete self.unhook.methods[methName];
    } else {
      throw new Error('Method not hooked: ' + methName);
    }
  };

  obj.unhook.methods = {};
};
