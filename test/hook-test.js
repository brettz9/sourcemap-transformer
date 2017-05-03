const installHookTo = require('./installHookTo');

const stdout = process.stdout;

installHookTo(stdout);

console.log('-- Sync');

stdout.hook('write', function (string, encoding, fd, write) {
  write('caught: ' + string);
});

console.log('foo');

stdout.unhook('write');

console.log('-- Async');

stdout.hook('write', function (string, encoding, fd, write) {
  write('caught async: ' + string);
}, true);

console.log('bar');

stdout.unhook('write');

console.log('baz');

      /*
      const installHookTo = require('./installHookTo');

      const stdout = process.stdout;
      installHookTo(stdout);

      stdout.hook('write', function (string, encoding, fd, write) {
        write('sss' + string);
      }, true);

      mocha.run(function (failures) {
        console.log('fff', failures);
        done();
      });
      stdout.unhook('write');
      */
