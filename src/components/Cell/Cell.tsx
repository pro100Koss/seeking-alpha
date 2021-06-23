import React, {useCallback} from "react";
import "./Cell.scss";

type Props = {
    isAlive: boolean;
    onClick: (x: number, y: number) => void;
    x: number;
    y: number;
};

export const Cell: React.FC<Props> = ({x, y, isAlive, onClick}) => {
    const className = "cell" + (isAlive ? " is-alive" : '');

    const handleClick = useCallback(() => {
        onClick(x, y);
    }, [onClick, x, y]);

    return (<div className={className} onClick={handleClick}/>);
}
