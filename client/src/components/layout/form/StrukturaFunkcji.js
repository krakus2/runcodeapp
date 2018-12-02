import React from 'react';
import { RowWrapper, Span } from '../../../styles/layout/Landing';
import Typography from '@material-ui/core/Typography';

export default function StrukturaFunkcji({
   nazwaFunkcji,
   returnArgs,
   iloscArg,
   isEmpty,
   wygenerujStruktureFunkcji,
   args
}) {
   console.log(nazwaFunkcji.length === 0, isEmpty(args) && iloscArg !== 0, isEmpty(returnArgs));
   console.log('szczegolowo 2 argument', isEmpty(args), iloscArg !== 0);
   return (
      <>
         <RowWrapper leftMargin>
            <Typography variant="h6">Struktura funkcji</Typography>
         </RowWrapper>
         <RowWrapper leftMargin>
            <Typography variant="subtitle1" gutterBottom>
               {nazwaFunkcji.length === 0 ||
               (isEmpty(args) && iloscArg !== 0) ||
               isEmpty(returnArgs) ? (
                  'int NazwaFunkcji(int A) - przykładowa nazwa - wypełnij wszystkie pola, aby wygenerować swoją'
               ) : (
                  <Span>{wygenerujStruktureFunkcji()}</Span>
               )}
            </Typography>
         </RowWrapper>
      </>
   );
}
