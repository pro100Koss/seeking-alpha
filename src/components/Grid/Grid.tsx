import React from "react";
import {Cell} from "../Cell/Cell";
import {Row} from "../Row/Row";
import "./Grid.scss";

type Props = {
    map: number[][];
    onClickOnCell: (x: number, y: number) => void;
}

export const Grid: React.FC<Props> = ({map, onClickOnCell}) => {
    const height = map.length;
    const width = map.length > 0 ? map[0].length : 0;
    const rows = [];

    for (let y = 0; y < height; y++) {
        const rowCells = [];
        for (let x = 0; x < width; x++) {
            rowCells.push(<Cell key={x} x={x} y={y} isAlive={!!map[y][x]} onClick={onClickOnCell}/>);
        }
        rows.push(<Row key={y} cells={rowCells}/>);
    }

    return (<div className="grid">{rows}</div>);
};
