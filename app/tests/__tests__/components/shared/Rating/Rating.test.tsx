import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Rating } from '~/components';

describe('Rating Component', () => {
  test('renders the correct number of active and inactive icons based on score', () => {
    const score = 70;
    render(<Rating score={score} />);

    const activeIcons = screen.getAllByTestId('fire-rating-active');

    const inactiveIcons = screen.getAllByTestId('fire-rating');

    expect(activeIcons).toHaveLength(7);
    expect(inactiveIcons).toHaveLength(3);
  });

  test('displays the correct score text', () => {
    const score = 50;
    render(<Rating score={score} />);

    const scoreText = screen.getByText('(5 / 10)');
    expect(scoreText).toBeInTheDocument();
  });

  test('displays 0 active icons when score is 0', () => {
    render(<Rating score={0} />);

    const activeIcons = screen.getAllByTestId('fire-rating');
    expect(activeIcons).toHaveLength(10);
  });

  test('displays maximum active icons when score is 100', () => {
    render(<Rating score={100} />);

    const activeIcons = screen.getAllByTestId('fire-rating-active');
    expect(activeIcons).toHaveLength(10);
  });
});
