import React from "react";
import { RowWrapper, Span } from "../../../styles/layout/Landing";
import Typography from "@material-ui/core/Typography";

export default function StrukturaFunkcji({
    nazwaFunkcji,
    returnArgs,
    isEmpty,
    wygenerujStruktureFunkcji,
    args
}) {
    return (
        <>
            <RowWrapper>
                <Typography variant="h6">Struktura funkcji</Typography>
            </RowWrapper>
            <RowWrapper leftMargin>
                <Typography variant="subtitle1" gutterBottom>
                    {nazwaFunkcji.length === 0 || isEmpty(args) || isEmpty(returnArgs) ? (
                        "int NazwaFunkcji(int A) - przykładowa nazwa - wypełnij wszystkie pola, aby wygenerować swoją"
                    ) : (
                        <Span>{wygenerujStruktureFunkcji()}</Span>
                    )}
                </Typography>
            </RowWrapper>
        </>
    );
}
