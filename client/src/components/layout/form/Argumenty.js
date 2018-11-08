import React from "react";
import { RowWrapper } from "../../../styles/layout/Landing";
import SelectElem from "./SelectElem";

export default function Argumenty({ iloscArg, handleArgTypeChange, args }) {
    return (
        <>
            {Array.from(Array(iloscArg)).map((elem, i) => (
                <React.Fragment key={i}>
                    <RowWrapper>
                        <SelectElem
                            i={i}
                            handleArgTypeChange={handleArgTypeChange}
                            args={args}
                            argsName={"args"}
                            secondColumn={false}
                            values={["Typ prosty", "Tablica []"]}
                            title={`Typ A argumentu ${i + 1}`}
                        />
                        <SelectElem
                            i={i}
                            handleArgTypeChange={handleArgTypeChange}
                            args={args}
                            argsName={"args"}
                            secondColumn={true}
                            values={[
                                "int",
                                "double",
                                "float",
                                "decimal",
                                "long",
                                "short",
                                "string",
                                "char",
                                "boolean",
                                "byte"
                            ]}
                            title={`Typ B argumentu ${i + 1}`}
                        />
                    </RowWrapper>
                </React.Fragment>
            ))}
        </>
    );
}
