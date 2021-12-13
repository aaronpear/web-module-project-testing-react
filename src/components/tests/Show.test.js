import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

const testData = {
    name: 'testName',
    summary: 'testSummary',
    seasons: [{id: 0, name: 'testSeasonName', episodes: ['testEp1', 'testEp2', 'testEp3']}]
}

test('renders without errors', ()=>{
    render(<Show show={testData} selectedSeason={'none'} />);
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} />);

    const loadText = screen.queryByTestId('loading-container')

    expect(loadText).toHaveTextContent('Fetching data...');
});


test('renders same number of options seasons are passed in', ()=>{
    render(<Show show={testData} selectedSeason={'none'} />);

    const seasonSelector = screen.getByLabelText(/select a season/i);

    expect(seasonSelector).toHaveLength(2);
});

test('handleSelect is called when an season is selected', async () => {
    // render(<Show show={testData} selectedSeason={'none'} />);

    // let episodes = screen.queryByTestId('episodes-container');
    // expect(episodes).not.toBeInTheDocument();

    // const seasonSelector = screen.getByLabelText(/select a season/i);
    // userEvent.click(seasonSelector);
    // expect(seasonSelector).toHaveLength(2);
    // console.log(seasonSelector);

    // const seasonOption = screen.getByText(/testSeasonName/i);
    // userEvent.click(seasonOption);

    // episodes = await screen.queryByTestId('episodes-container');
    // expect(episodes).toBeInTheDocument();

});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {});
