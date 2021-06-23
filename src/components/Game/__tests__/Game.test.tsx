import {shallow, ShallowWrapper} from "enzyme";
import gameMapService from "../../../services/GameMapService";
import {Game} from "../Game";
import {Grid} from "../../Grid/Grid";
import {mocked} from "ts-jest/utils";

jest.mock('../../../services/GameMapService');

describe('Game', () => {
    let wrapper: ShallowWrapper;
    let instance: Game;

    beforeEach(() => {
        wrapper = shallow(<Game/>);
        instance = wrapper.instance() as Game;
    });

    describe('renders correctly', () => {
        test('renders without errors', () => {
            expect(wrapper).toHaveLength(1);
        });

        test('renders Grid with correct props', () => {
            const map = wrapper.state('map');

            expect(wrapper.find(Grid)).toHaveLength(1);
            expect(wrapper.find(Grid).props()).toEqual({map, onClickOnCell: instance.onClickOnCell});
        })

        test('renders controls by default', () => {
            expect(wrapper.find('.controls')).toHaveLength(1);
        });

        test('renders hint by default', () => {
            expect(wrapper.find('.hint')).toHaveLength(1);
        });

        test('renders 4 buttons', () => {
            expect(wrapper.find('.controls button')).toHaveLength(4);
        });

        describe('renders correctly when game is running', () => {
            beforeEach(() => {
                wrapper.setState({isGameRunning: true});
            });

            test('does not render controls ', () => {
                expect(wrapper.find('.controls')).toHaveLength(0);
            });

            test('does not render hint', () => {
                expect(wrapper.find('.hint')).toHaveLength(0);
            });
        })
    });

    describe('componentWillUnmount', () => {
        const fakeInterval = 999;

        test('clears interval', () => {
            instance.updateInterval = fakeInterval;
            jest.spyOn(window, 'clearInterval');

            instance.componentWillUnmount();
            expect(window.clearInterval).toHaveBeenCalledTimes(1);
            expect(window.clearInterval).toHaveBeenCalledWith(fakeInterval);
        });
    });

    describe('onUpdate', () => {
        const map = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];

        beforeEach(() => {
            wrapper.setState({map: map});

        });

        test('updates states with correct new map', () => {
            const expectedMap = [
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0]
            ];
            mocked(gameMapService.getCellNeighboursQuantity).mockImplementation((x: number, y: number) => {
                return x === 2 && y > 0 && y < 4 ? 3 : 0;
            })

            instance.onUpdate();
            expect(wrapper.state('map')).toEqual(expectedMap);
        });

        test('calls gameMapService.getCellNeighboursQuantity for each cell', () => {
            instance.onUpdate();
            expect(gameMapService.getCellNeighboursQuantity).toHaveBeenCalledTimes(25);
        });
    });
})
