import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';

import fetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');

const testData = {
    name: 'testName',
    summary: 'testSummary',
    seasons: [{id: 0, name: 'testSeasonName', episodes: ['testEp1', 'testEp2', 'testEp3']}]
}

test('renders without errors with no props', ()=>{
    render(<Display />);
});

test('renders Show component when the button is clicked ', async ()=>{
    fetchShow.mockResolvedValueOnce(testData);

    render(<Display />);

    let show = screen.queryByTestId('show-container')
    expect(show).not.toBeInTheDocument();

    const button = screen.getByRole('button');
    userEvent.click(button);

    show = await screen.findByTestId('show-container');
    expect(show).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async ()=>{
    fetchShow.mockResolvedValueOnce(testData);

    render(<Display />);

    const button = screen.getByRole('button');
    userEvent.click(button);

    const seasonSelector = await screen.findByLabelText(/select a season/i);

    expect(seasonSelector).toHaveLength(2);

});

test('displayFunc is called when fetch button is pressed', async () => {
    const testDisplayFunc = jest.fn();
    fetchShow.mockResolvedValueOnce(testData);

    render (<Display displayFunc={testDisplayFunc} />);

    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => expect(testDisplayFunc).toBeCalled());
})
