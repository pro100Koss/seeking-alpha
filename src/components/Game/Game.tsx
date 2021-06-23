import React from "react";
import {Grid} from "../Grid/Grid";
import gameMapService, {GameMapService} from "../../services/GameMapService";
import "./Game.scss";

const GAME_UPDATE_INTERVAL = 400;
const DEFAULT_GRID_SIZE = 17;

type State = { map: number[][], isGameRunning: boolean };
type Props = {};

export class Game extends React.Component<Props, State> {
    updateInterval?: number;

    state = {
        map: Array(DEFAULT_GRID_SIZE).fill([]).map(() => Array(DEFAULT_GRID_SIZE).fill(0)),
        isGameRunning: false,
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
        const {isGameRunning} = this.state;

        if (isGameRunning && isGameRunning !== prevState.isGameRunning) {
            this.updateInterval = window.setInterval(this.onUpdate, GAME_UPDATE_INTERVAL);
        }
    }

    componentWillUnmount() {
        window.clearInterval(this.updateInterval);
    }

    onUpdate = () => {
        const {map} = this.state;
        const newMap = map.map(cells => [...cells]);

        map.forEach((row, y) => {
            row.forEach((cell, x) => {
                const aliveNeighbours = gameMapService.getCellNeighboursQuantity(x, y, map);

                if (cell) {
                    if (aliveNeighbours < 2 || aliveNeighbours > 3) {
                        newMap[y][x] = 0;
                    }
                } else if (aliveNeighbours === 3) {
                    newMap[y][x] = 1;
                }
            });
        });

        this.setState({map: newMap});
    }

    onClickOnCell = (x: number, y: number) => {
        console.log(x, y);

        const {isGameRunning} = this.state;
        if (isGameRunning) return;

        this.setState(({map}) => {
            const updatedMap = gameMapService.copyMap(map);
            updatedMap[y][x] = updatedMap[y][x] === 1 ? 0 : 1;

            return {map: updatedMap};
        })
    }

    onStart = () => {
        this.setState({isGameRunning: true});
    }

    onStartPredefined4 = () => {
        this.setState({isGameRunning: true, map: GameMapService.PREDEFINED_MAP_4});
    }

    onStartPredefined5 = () => {
        this.setState({isGameRunning: true, map: GameMapService.PREDEFINED_MAP_5});
    }

    onStartPredefined6 = () => {
        this.setState({isGameRunning: true, map: GameMapService.PREDEFINED_MAP_6});
    }

    render = () => {
        const {map, isGameRunning} = this.state;

        return (<div className="game">
            <Grid map={map} onClickOnCell={this.onClickOnCell}/>

            {!isGameRunning && (
                <div className="hint">*Click on the cell to set alive/dead state. After clicking on any button game
                    will start and you will be not able to change the cell state manually. To restart the game just
                    refresh this page.</div>)}

            {!isGameRunning && (<div className="controls">
                <button onClick={this.onStart}>Start game</button>
                <button onClick={this.onStartPredefined4}>Start predefined 4x4</button>
                <button onClick={this.onStartPredefined5}>Start predefined 5x5</button>
                <button onClick={this.onStartPredefined6}>Start predefined 6x6</button>
            </div>)}
        </div>);
    }
}
