import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const testEpisode = {
    id: 0, 
    image: null, 
    name: 'testEp0', 
    season: 'testSeason', 
    number: 'testNum', 
    summary: 'this is a test summary', 
    runtime: 10
}

test("renders without error", () => {
    render(<Episode episode={testEpisode} />);
});

test("renders the summary test passed as prop", ()=>{
    render(<Episode episode={testEpisode} />);

    const summary = screen.queryByText(/this is a test summary/i);

    expect(summary).toBeInTheDocument();
    expect(summary).toBeTruthy();
    expect(summary).toHaveTextContent(/this is a test summary/i);
});

test("renders default image when image is not defined", ()=>{
    render(<Episode episode={testEpisode} />);

    const img = screen.findByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png');

    expect(img).toBeTruthy();
});
