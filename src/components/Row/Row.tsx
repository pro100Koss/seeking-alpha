import React from "react";
import "./Row.scss";

type Props = {
    cells: JSX.Element[];
};

export const Row: React.FC<Props> = ({cells}) => (<div className="row">{cells}</div>);
