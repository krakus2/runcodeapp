import React from 'react';
import { RowWrapper } from '../../../styles/layout/Landing.js';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//TODO - wyjebac switcha
import Switch from '@material-ui/core/Switch';

export default function Rekurencja({ czyRekurencja, handleSwitchChange }) {
   return (
      <>
         <RowWrapper leftMargin>
            <Typography variant="h6">
               Zadanie wymaga rozwiązania rekurencyjnego
            </Typography>
         </RowWrapper>
         <RowWrapper leftMargin>
            <FormControlLabel
               control={
                  <Switch
                     checked={czyRekurencja}
                     onChange={handleSwitchChange('czyRekurencja')}
                     value="czyRekurencja"
                     color="primary"
                  />
               }
            />
         </RowWrapper>
      </>
   );
}
