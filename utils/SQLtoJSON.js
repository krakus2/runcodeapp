const _ = require('underscore.string');

/* var errorEmpty = 'Please upload a file or type in something.',*/
const inQuotes = new RegExp(/(^`.*`$)|(^'.*'$)|(^".*"$)/);

function convert(sql) {
   /*  if (sql.length == 0) throw errorEmpty; */

   // Remove comments and empty lines, and collapse statements on one line
   sql = sql
      // Remove comments
      .replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm, '$1')
      .replace(/^--.*[\r\n]/gm, '')
      // Remove empty lines
      .replace(/^\s*[\r\n]/gm, '')
      // Collapse statements (TO DO: Convert this to a single regex)
      .replace(/;\s*[\r\n]/gm, ';;')
      .replace(/[\r\n]/gm, ' ')
      .replace(/;;\s?/gm, ';\n');
   //throw sql;
   var lines = _.lines(sql);
   if (lines.length == 0) throw new Error('Empty line');

   // Split into tables
   var tables = {},
      l,
      line;
   try {
      for (l = 0; l < lines.length; l++) {
         (line = lines[l]), (words = _.words(line));
         if (!words.length) continue;

         // CREATE TABLE [IF NOT EXISTS] <table> (<col>, ...)
         if (
            words.length >= 3 &&
            words[0].toUpperCase() == 'CREATE' &&
            words[1].toUpperCase() == 'TABLE'
         ) {
            var i = 2;
            while (!words[i].match(inQuotes) && i < words.length) i++;
            if (i >= words.length) throw 'Cannot find table name in CREATE TABLE statement.';
            var name = _.trim(words[i], '`\'"');
            tables[name] = {
               header: [],
               values: []
            };

            var values = _(line)
               .chain()
               .strRight('(')
               .strLeftBack(')')
               .words(',')
               .value();
            tables[name].header = _.reduce(
               values,
               function(result, value) {
                  var words = _.words(value);
                  if (!words.length) throw 'Cannot find columns for table ' + name;
                  var first = _.trim(words[0]);
                  if (
                     _.startsWith(first, "'") ||
                     _.startsWith(first, '`') ||
                     _.startsWith(first, '"')
                  )
                     result.push(_.trim(first, '`\'"'));
                  return result;
               },
               []
            );

            if (!tables[name].header.length) throw 'No columns found for table ' + name;
         }

         // INSERT INTO <table> VALUES (<cell>, ...)
         else if (
            words.length >= 4 &&
            words[0].toUpperCase() == 'INSERT' &&
            words[1].toUpperCase() == 'INTO' &&
            words[2].match(inQuotes) &&
            words[3].toUpperCase() == 'VALUES'
         ) {
            var name = _.trim(words[2], '`\'"');
            if (!tables[name]) throw 'Table ' + name + ' was not defined in a CREATE TABLE.';
            var table = tables[name];

            var i = 3;
            while (words[i].toUpperCase() != 'VALUES' && i < words.length) i++;
            if (i == words.length || words[i].toUpperCase() != 'VALUES')
               throw 'Error parsing INSERT INTO statement. Cannot find VALUES.';
            i += 1;
            if (i == words.length)
               throw 'Error parsing INSERT INTO statement. No values found after VALUES.';

            var records = _.trim(words.slice(i).join(' '))
               .replace(/(\))\s*,\s*(\()/g, '),(')
               .replace(/^\(/, '')
               .replace(/\)$/, '')
               .split('),(');

            _.each(records, function(str) {
               var values = _.words(str, ',');
               tables[name].values.push(
                  _.map(values, function(value) {
                     return _.trim(value, ' `\'"');
                  })
               );
            });
         }

         // INSERT INTO <table> (<col>, ...) VALUES (<cell>, ...), ...
         else if (
            words.length >= 4 &&
            words[0].toUpperCase() == 'INSERT' &&
            words[1].toUpperCase() == 'INTO' &&
            words[2].match(inQuotes) &&
            _.startsWith(words[3], '(')
         ) {
            var name = _.trim(words[2], '`\'"');
            if (!tables[name]) throw 'Table ' + name + ' was not defined in a CREATE TABLE.';
            var table = tables[name];

            var i = 3;
            while (words[i].toUpperCase() != 'VALUES' && i < words.length) i++;
            if (i == words.length || words[i].toUpperCase() != 'VALUES')
               throw 'Error parsing INSERT INTO statement. Cannot find VALUES.';

            var cols = _.map(words.slice(3, i), function(value) {
               return _.trim(value, '(), `\'"');
            });
            if (!cols.length)
               throw 'Error parsing INSERT INTO statement. No column names found for table ' +
                  name +
                  ' in ' +
                  words[3];
            words[3];

            i += 1;
            if (i == words.length)
               throw 'Error parsing INSERT INTO statement. No values found after VALUES.';

            var records = _.trim(words.slice(i).join(' '))
               .replace(/(\))\s*,\s*(\()/g, '),(')
               .replace(/^\(/, '')
               .replace(/\)$/, '')
               .split('),(');

            _.each(records, function(str) {
               var values = _.words(str, ',');
               if (values.length != cols.length)
                  throw 'Error parsing INSERT INTO statement. Values ' +
                     str +
                     ' does not have the same number of items as columns ' +
                     words[3];
               var record = {};
               _.each(tables[name].header, function(col) {
                  var index = _.indexOf(cols, col),
                     value = index != -1 ? _.trim(values[index], ' `\'"') : null;
                  record[col] = value;
               });
               tables[name].values.push(_.values(record));
            });
         }
      }
   } catch (error) {
      throw 'Error: ' + error + '\n...' + line;
   }

   // Convert to objects now
   var objects = {};
   _.each(tables, function(table, name) {
      var keys = table.header;
      objects[name] = _.map(table.values, function(values) {
         var o = {};
         for (var k = 0; k < keys.length; k++) o[keys[k]] = values[k];
         return o;
      });
   });

   return objects;
}

const x = `CREATE TABLE \`task_submit\` (
   \`id\` int(11) NOT NULL,
   \`id_user\` int(11) NOT NULL,
   \`id_task\` int(11) NOT NULL,
   \`date_uploaded\` datetime NOT NULL,
   \`error_count\` int(11) NOT NULL,
   \`warning_count\` int(11) NOT NULL,
   \`test_count\` int(11) NOT NULL,
   \`error_list\` longtext COLLATE utf8_unicode_ci,
   \`warning_list\` longtext COLLATE utf8_unicode_ci,
   \`test_list\` longtext COLLATE utf8_unicode_ci
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
 
INSERT INTO \`task_submit\` (\`date_uploaded\`, \`error_count\`, \`test_count\`, \`test_list\`) VALUES
('2018-12-04 09:30:40', 0, 4, 
   '[
      "ID: 1 T: 0 F: ZwrocPodzielne P: System.Int32[]: [3,4,5,6,7,2,3], System.Int32: 4, System.Int32: 0 O: System.String: \\"[4]\\" Z: System.String: \\"[,4]\\"",
      "ID: 3 T: 1 F: ZwrocPodzielne P: System.Int32[]: [], System.Int32: 44, System.Int32: 0 O: System.String: \\"[]\\" Z: System.String: \\"[]\\"",
      "ID: 2 T: 1 F: ZwrocPodzielne P: System.Int32[]: [3,4,5,6,7,2,3], System.Int32: 44, System.Int32: 0 O: System.String: \\"[]\\" Z: System.String: \\"[]\\"",
      "ID: 4 T: 1 F: ZwrocPodzielne P: System.Int32[]: [9], System.Int32: 9, System.Int32: 0 O: System.String: \\"[9]\\" Z: System.String: \\"[9]\\""
   ]'),
('2018-12-04 09:23:22', 1, 4, 
   '[
      "ID: 1 T: 0 F: ZwrocPodzielne P: System.Int32[]: [3,4,5,6,7,2,3], System.Int32: 4, System.Int32: 0 O: System.String: \\"[4]\\" Z: System.String: \\"[,4]\\"",
      "ID: 3 T: 1 F: ZwrocPodzielne P: System.Int32[]: [], System.Int32: 44, System.Int32: 0 O: System.String: \\"[]\\" Z: System.String: \\"[]\\"",
      "ID: 2 T: 1 F: ZwrocPodzielne P: System.Int32[]: [3,4,5,6,7,2,3], System.Int32: 44, System.Int32: 0 O: System.String: \\"[]\\" Z: System.String: \\"[]\\"",
      "ID: 4 T: 1 F: ZwrocPodzielne P: System.Int32[]: [9], System.Int32: 9, System.Int32: 0 O: System.String: \\"[9]\\" Z: System.String: \\"[9]\\""]
   ')
;`;

var obj = convert(x);

console.log(JSON.stringify(obj));
