import React from 'react';
import { RowWrapper } from '../../../styles/layout/Landing';
import SelectElem from './SelectElem';
import Typography from '@material-ui/core/Typography';

export default function TypZwracany({ handleArgTypeChange, returnArgs }) {
   return (
      <>
         <RowWrapper leftMargin>
            <Typography variant="h6">Typ zwracany</Typography>
         </RowWrapper>
         <RowWrapper>
            <SelectElem
               i={0}
               handleArgTypeChange={handleArgTypeChange}
               args={returnArgs}
               argsName={'returnArgs'}
               secondColumn={false}
               values={['Typ prosty', 'Tablica []']}
               title={`Typ zwracany A`}
            />
            <SelectElem
               i={0}
               handleArgTypeChange={handleArgTypeChange}
               args={returnArgs}
               argsName={'returnArgs'}
               secondColumn={true}
               values={[
                  'int',
                  'double',
                  'float',
                  'decimal',
                  'long',
                  'short',
                  'string',
                  'char',
                  'boolean',
                  'byte'
               ]}
               title={`Typ zwracany B`}
            />
         </RowWrapper>
      </>
   );
}
