//dependence libraries
//fs underscore underscore.string
const c = console,
   _fs = require('fs'),
   _path = {
      in: ['task_submit.sql'],
      out: ['out2.json']
   },
   _encode = 'utf-8';

for (let _i in _path.in) {
   if (_path.out[_i]) {
      _fs.readFile(_path.in[_i], _encode, (_err, _result) => {
         if (_err) c.log('$fs.readFile(), ' + _err);
         else {
            _result = JSON.stringify($convert(_result));
            _fs.writeFile(_path.out[_i], _result, _err => {
               if (_err) c.log('$fs.writeFile(), ' + _err);
               else c.log('convert "' + _path.in[_i] + '" to "' + _path.out[_i] + '"');
            });
         }
      });
   }
}

//
const _ = require('underscore'),
   s = require('underscore.string');
function $convert(a) {
   if (0 == a.length) throw errorEmpty;
   a = a
      .replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm, '$1')
      .replace(/^--.*[\r\n]/gm, '')
      .replace(/^\s*[\r\n]/gm, '')
      .replace(/;\s*[\r\n]/gm, ';;')
      .replace(/[\r\n]/gm, ' ')
      .replace(/;;\s?/gm, ';\n');
   var b = _.lines(a);
   if (0 == b.length) throw errorEmpty;
   var d,
      e,
      c = {};
   try {
      for (d = 0; d < b.length; d++)
         if (((e = b[d]), (words = _.words(e)), words.length))
            if (
               words.length >= 3 &&
               'CREATE' == words[0].toUpperCase() &&
               'TABLE' == words[1].toUpperCase()
            ) {
               for (var f = 2; !words[f].match(inQuotes) && f < words.length; ) f++;
               if (f >= words.length)
                  throw 'Cannot find table name in CREATE TABLE statement.';
               var g = _.trim(words[f], '`\'"');
               c[g] = { header: [], values: [] };
               var h = _(e)
                  .chain()
                  .strRight('(')
                  .strLeftBack(')')
                  .words(',')
                  .value();
               if (
                  ((c[g].header = _.reduce(
                     h,
                     function(a, b) {
                        var c = _.words(b);
                        if (!c.length) throw 'Cannot find columns for table ' + g;
                        var d = _.trim(c[0]);
                        return (
                           (_.startsWith(d, "'") ||
                              _.startsWith(d, '`') ||
                              _.startsWith(d, '"')) &&
                              a.push(_.trim(d, '`\'"')),
                           a
                        );
                     },
                     []
                  )),
                  !c[g].header.length)
               )
                  throw 'No columns found for table ' + g;
            } else if (
               words.length >= 4 &&
               'INSERT' == words[0].toUpperCase() &&
               'INTO' == words[1].toUpperCase() &&
               words[2].match(inQuotes) &&
               'VALUES' == words[3].toUpperCase()
            ) {
               var g = _.trim(words[2], '`\'"');
               if (!c[g]) throw 'Table ' + g + ' was not defined in a CREATE TABLE.';
               for (
                  var f = (c[g], 3);
                  'VALUES' != words[f].toUpperCase() && f < words.length;

               )
                  f++;
               if (f == words.length || 'VALUES' != words[f].toUpperCase())
                  throw 'Error parsing INSERT INTO statement. Cannot find VALUES.';
               if (((f += 1), f == words.length))
                  throw 'Error parsing INSERT INTO statement. No values found after VALUES.';
               var j = _.trim(words.slice(f).join(' '))
                  .replace(/(\))\s*,\s*(\()/g, '),(')
                  .replace(/^\(/, '')
                  .replace(/\)$/, '')
                  .split('),(');
               _.each(j, function(a) {
                  var b = _.words(a, ',');
                  c[g].values.push(
                     _.map(b, function(a) {
                        return _.trim(a, ' `\'"');
                     })
                  );
               });
            } else if (
               words.length >= 4 &&
               'INSERT' == words[0].toUpperCase() &&
               'INTO' == words[1].toUpperCase() &&
               words[2].match(inQuotes) &&
               _.startsWith(words[3], '(')
            ) {
               var g = _.trim(words[2], '`\'"');
               if (!c[g]) throw 'Table ' + g + ' was not defined in a CREATE TABLE.';
               for (
                  var f = (c[g], 3);
                  'VALUES' != words[f].toUpperCase() && f < words.length;

               )
                  f++;
               if (f == words.length || 'VALUES' != words[f].toUpperCase())
                  throw 'Error parsing INSERT INTO statement. Cannot find VALUES.';
               var k = _.map(words.slice(3, f), function(a) {
                  return _.trim(a, '(), `\'"');
               });
               if (!k.length)
                  throw 'Error parsing INSERT INTO statement. No column names found for table ' +
                     g +
                     ' in ' +
                     words[3];
               if ((words[3], (f += 1), f == words.length))
                  throw 'Error parsing INSERT INTO statement. No values found after VALUES.';
               var j = _.trim(words.slice(f).join(' '))
                  .replace(/(\))\s*,\s*(\()/g, '),(')
                  .replace(/^\(/, '')
                  .replace(/\)$/, '')
                  .split('),(');
               _.each(j, function(a) {
                  var b = _.words(a, ',');
                  if (b.length != k.length)
                     throw 'Error parsing INSERT INTO statement. Values ' +
                        a +
                        ' does not have the same number of items as columns ' +
                        words[3];
                  var d = {};
                  _.each(c[g].header, function(a) {
                     var c = _.indexOf(k, a),
                        e = c != -1 ? _.trim(b[c], ' `\'"') : null;
                     d[a] = e;
                  }),
                     c[g].values.push(_.values(d));
               });
            }
   } catch (a) {
      throw 'Error: ' + a + '\n...' + e;
   }
   var l = {};
   return (
      _.each(c, function(a, b) {
         var c = a.header;
         l[b] = _.map(a.values, function(a) {
            for (var b = {}, d = 0; d < c.length; d++) b[c[d]] = a[d];
            return b;
         });
      }),
      l
   );
}
_.mixin(s.exports());
var errorEmpty = 'Please upload a file or type in something.',
   inQuotes = new RegExp(/(^`.*`$)|(^'.*'$)|(^".*"$)/);
